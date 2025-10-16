import React from 'react'
import Mascot, { type Expression } from '@/components/Mascot'
import Logo from '@/components/Logo'
import { type PlatformKey } from '@/lib/platformSizes'

export type OverlayKind = 'lower-third' | 'title-card' | 'mascot-only' | 'frame'
type Accent = 'lemon' | 'red' | 'cyan' | 'orange' | 'offwhite' | 'gray'

export default function VideoOverlays({
  platform: _platform,
  kind = 'lower-third',
  primaryText = 'Speaker Name',
  secondaryText = 'Title / Handle',
  showLogo = true,
  expression = 'none',
  accent = 'red',
  circleAccent,
  framePadding = 24,
  variant = 'rounded-16',
  shadow = true,
  stroke = true,
  safeZones = false,
  eyeState,
  addOns,
}: {
  platform: PlatformKey
  kind?: OverlayKind
  primaryText?: string
  secondaryText?: string
  showLogo?: boolean
  expression?: Expression
  accent?: Accent
  circleAccent?: Accent
  framePadding?: number
  variant?: 'rounded-8' | 'rounded-16' | 'rounded-24'
  shadow?: boolean
  stroke?: boolean
  safeZones?: boolean
  eyeState?: 'normal' | 'closed' | 'white'
  addOns?: ('anger' | 'teardrop' | 'teardrop-expression' | 'tears-streaming')[]
}) {
  // platform is kept for parity with other templates; current overlay fills parent container
  void _platform
  const accentVar: Record<Accent, string> = {
    lemon: 'var(--rt-light-lemon)',
    red: 'var(--rt-light-red)',
    cyan: 'var(--rt-pastel-gray-cyan)',
    orange: 'var(--rt-pastel-orange)',
    offwhite: 'var(--rt-off-white)',
    gray: 'var(--rt-gray)',
  }

  const radius = variant === 'rounded-8' ? 8 : variant === 'rounded-16' ? 16 : 24
  const panelShadow = shadow ? '0 8px 24px rgba(17,24,39,0.18)' : 'none'
  const panelBorder = stroke ? '2px solid rgba(17, 24, 39, 0.12)' : '1px solid rgba(17, 24, 39, 0.08)'

  // Transparent canvas: full-size canvas, elements positioned inside
  return (
    <div className="flex flex-col gap-3" style={{ width: '100%', height: '100%' }}>
      <div id="canvas" className="relative" style={{ width: '100%', height: '100%' }}>
        {safeZones && (
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-0 border-2 border-dashed" style={{
              top: 60, left: 60, right: 60, bottom: 60, borderColor: 'rgba(17,24,39,0.15)'
            }} />
            <div className="absolute inset-0 border border-dashed" style={{
              top: 120, left: 120, right: 120, bottom: 120, borderColor: 'rgba(17,24,39,0.12)'
            }} />
          </div>
        )}

        {kind === 'frame' && (
          <>
            <div className="absolute left-0 right-0" style={{ top: 0, height: framePadding, background: accentVar[accent] }} />
            <div className="absolute left-0 right-0" style={{ bottom: 0, height: framePadding, background: accentVar[accent] }} />
            <div className="absolute top-0 bottom-0" style={{ left: 0, width: framePadding, background: accentVar[accent] }} />
            <div className="absolute top-0 bottom-0" style={{ right: 0, width: framePadding, background: accentVar[accent] }} />
          </>
        )}

        {kind === 'lower-third' && (
          <div className="absolute left-0 right-0 bottom-0 p-4" style={{ height: '33%' }}>
            <div className="flex items-center gap-3 w-fit" style={{
              padding: '10px 14px',
              background: 'rgba(255, 255, 255, 0.94)',
              borderRadius: radius,
              border: panelBorder,
              boxShadow: panelShadow,
            }}>
              {showLogo && <Logo />}
              <div>
                <div className="font-extrabold" style={{ color: '#111827', fontSize: 28 }}>{primaryText}</div>
                {secondaryText && <div className="-mt-1 text-sm" style={{ color: '#374151' }}>{secondaryText}</div>}
              </div>
              <div className="ml-2 h-8 w-8 rounded-full" style={{ background: accentVar[circleAccent ?? accent] }} />
            </div>
          </div>
        )}

        {kind === 'title-card' && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3" style={{
              background: 'rgba(255,255,255,0.94)',
              borderRadius: radius,
              border: panelBorder,
              boxShadow: panelShadow,
            }}>
              {showLogo && <Logo />}
              <div className="text-3xl font-extrabold" style={{ color: '#111827' }}>{primaryText}</div>
            </div>
            {secondaryText && <div className="mt-2 text-lg" style={{ color: '#374151' }}>{secondaryText}</div>}
          </div>
        )}

        {kind === 'mascot-only' && (
          <div className="absolute right-6 bottom-6">
            <Mascot expression={expression} eyeState={eyeState} addOns={addOns} size={320} />
          </div>
        )}
      </div>
    </div>
  )
}
