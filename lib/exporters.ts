import { toPng, toSvg } from 'html-to-image'

function disableCrossOriginStylesheets(): () => void {
  const disabled: HTMLLinkElement[] = []
  try {
    const sheets = Array.from(document.styleSheets) as CSSStyleSheet[]
    for (const sheet of sheets) {
      const href = sheet.href
      const owner = sheet.ownerNode as HTMLElement | null
      if (!href || !owner) continue
      const origin = new URL(href, window.location.href).origin
      if (origin !== window.location.origin && owner.tagName === 'LINK') {
        const link = owner as HTMLLinkElement
        if (!link.disabled) {
          link.disabled = true
          disabled.push(link)
        }
      }
    }
  } catch {
    // ignore – best-effort only
  }
  return () => {
    for (const link of disabled) link.disabled = false
  }
}

interface HtmlToImageOptions { cacheBust?: boolean; pixelRatio?: number; skipFonts?: boolean }

async function safeToPng(node: HTMLElement, opts: HtmlToImageOptions) {
  const restore = disableCrossOriginStylesheets()
  try {
    return await toPng(node, opts)
  } catch {
    // Fallback: retry with skipFonts to avoid sheet font reads
    return await toPng(node, { ...opts, skipFonts: true })
  } finally {
    restore()
  }
}

async function safeToSvg(node: HTMLElement, opts: HtmlToImageOptions) {
  const restore = disableCrossOriginStylesheets()
  try {
    return await toSvg(node, opts)
  } catch {
    return await toSvg(node, { ...opts, skipFonts: true })
  } finally {
    restore()
  }
}

export async function exportNodeAsPNG(node: HTMLElement, fileName: string) {
  const dataUrl = await safeToPng(node, { cacheBust: true, pixelRatio: 1 })
  const link = document.createElement('a')
  link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`
  link.href = dataUrl
  link.click()
}

export async function exportNodeAsSVG(node: HTMLElement, fileName: string) {
  const dataUrl = await safeToSvg(node, { cacheBust: true })
  const link = document.createElement('a')
  link.download = fileName.endsWith('.svg') ? fileName : `${fileName}.svg`
  link.href = dataUrl
  link.click()
}
