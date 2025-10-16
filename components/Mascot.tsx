import React, { useEffect, useMemo, useState } from 'react'

export type Expression =
  | 'none'
  | 'anger'
  | 'closed-eye'
  | 'small-eye'
  | 'teardrop'
  | 'teardrop-expression'
  | 'tears-streaming'

type EyeState = 'normal' | 'closed' | 'white'
type AddOn = 'anger' | 'teardrop' | 'teardrop-expression' | 'tears-streaming'

type Props = {
  // Legacy prop support
  expression?: Expression
  // New grouped props (optional)
  eyeState?: EyeState
  addOns?: AddOn[]
  className?: string
  size?: number
}

/**
 * Mascot renders Capybara with composable eye-state and add-on overlays.
 * Implementation details:
 * - Loads Capybara.svg and strips Eye_Fill and Eye_Outline groups.
 * - Overlays selected eye-state SVG (Closed Eye / Small Eye).
 * - Overlays add-ons (anger, teardrop, teardrop-expression, tears-streaming).
 *   Constraint: tears-streaming only applies when eyeState is 'closed'.
 */
export default function Mascot({
  expression = 'none',
  eyeState: eyeStateProp,
  addOns: addOnsProp,
  className,
  size = 300,
}: Props) {
  // Map legacy expression to grouped state when explicit props not provided
  const fromLegacy = useMemo((): { eye: EyeState; addOns: AddOn[] } => {
    switch (expression) {
      case 'closed-eye':
        return { eye: 'closed', addOns: [] }
      case 'small-eye':
        return { eye: 'white', addOns: [] }
      case 'anger':
        return { eye: 'normal', addOns: ['anger'] }
      case 'teardrop':
        return { eye: 'normal', addOns: ['teardrop'] }
      case 'teardrop-expression':
        return { eye: 'normal', addOns: ['teardrop-expression'] }
      case 'tears-streaming':
        return { eye: 'closed', addOns: ['tears-streaming'] }
      case 'none':
      default:
        return { eye: 'normal', addOns: [] }
    }
  }, [expression])

  const eyeState: EyeState = eyeStateProp ?? fromLegacy.eye
  let addOns: AddOn[] = addOnsProp ?? fromLegacy.addOns
  // Enforce constraint: tears-streaming only with closed eyes
  if (eyeState !== 'closed') addOns = addOns.filter((a) => a !== 'tears-streaming')

  const [baseSvgHtml, setBaseSvgHtml] = useState<string>('')
  const needOverlays = eyeState !== 'normal' || addOns.length > 0

  useEffect(() => {
    let cancelled = false
    if (!needOverlays) return
    const load = async () => {
      try {
        const res = await fetch('/assets/svg/Capybara.svg')
        const text = await res.text()
        // Ensure centered scaling on root svg
        let svg = text.replace(/<svg([^>]*)>/, (_m, attrs) => `<svg${attrs} preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">`)

        if (eyeState === 'closed') {
          // Remove eye groups so closed-eye overlay replaces them
          svg = svg
            .replace(/<g[^>]*id=["']Eye_Fill["'][\s\S]*?<\/g>/g, '')
            .replace(/<g[^>]*id=["']Eye_Outline["'][\s\S]*?<\/g>/g, '')
        } else if (eyeState === 'white') {
          // Recolor Eye_Fill strokes to white, keep outlines
          svg = svg.replace(/(<g[^>]*id=["']Eye_Fill["'][^>]*>)([\s\S]*?)(<\/g>)/, (_m, open, inner, close) => {
            const recolored = inner.replace(/stroke="[^"]*"/g, 'stroke="rgb(255, 255, 255)"')
            return `${open}${recolored}${close}`
          })
        }

        if (!cancelled) setBaseSvgHtml(svg)
      } catch {
        // Fallback: keep base image if fetch fails
        if (!cancelled) setBaseSvgHtml('')
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [needOverlays, eyeState])

  const eyeOverlaySrc = eyeState === 'closed' ? '/assets/svg/Closed Eye.svg' : null

  const addOnSrcs: string[] = []
  if (addOns.includes('anger')) addOnSrcs.push('/assets/svg/Anger Expression.svg')
  if (addOns.includes('teardrop')) addOnSrcs.push('/assets/svg/Teardrop.svg')
  if (addOns.includes('teardrop-expression')) addOnSrcs.push('/assets/svg/Teardrop Expression.svg')
  if (addOns.includes('tears-streaming')) addOnSrcs.push('/assets/svg/Tears Streaming.svg')

  // If no overlays needed, render original asset unchanged
  if (!needOverlays) {
    return (
      <div className={className} style={{ position: 'relative', width: size, height: size }}>
        <img
          src="/assets/svg/Capybara.svg"
          alt="Capybara"
          width={size}
          height={size}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    )
  }

  return (
    <div className={className} style={{ position: 'relative', width: size, height: size }}>
      {baseSvgHtml && (
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          dangerouslySetInnerHTML={{ __html: baseSvgHtml }}
        />
      )}

      {addOnSrcs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="mascot add-on"
          width={size}
          height={size}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ))}

      {eyeOverlaySrc && (
        <img
          src={eyeOverlaySrc}
          alt={`${eyeState} eye overlay`}
          width={size}
          height={size}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </div>
  )
}
