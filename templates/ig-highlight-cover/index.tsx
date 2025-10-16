import React from 'react'
import { platformSizes, type PlatformKey } from '@/lib/platformSizes'
import ShapeDecor from '@/components/ShapeDecor'

export default function IGHighlightCover({
  platform,
  label,
  emoji,
  bgKey = 'lemon',
  decorVariant = 'none',
}: {
  platform: PlatformKey
  label: string
  emoji: string
  bgKey?: 'lemon'|'red'|'cyan'|'orange'|'offwhite'|'gray'
  decorVariant?: 'none' | 'playful' | 'tech' | 'games' | 'mascot'
}) {
  const size = platformSizes[platform]
  const bgVar: Record<typeof bgKey, string> = {
    lemon: 'var(--rt-light-lemon)',
    red: 'var(--rt-light-red)',
    cyan: 'var(--rt-pastel-gray-cyan)',
    orange: 'var(--rt-pastel-orange)',
    offwhite: 'var(--rt-off-white)',
    gray: 'var(--rt-gray)',
  } as const

  const circleSize = Math.min(size.width, size.height) * 0.5

  return (
    <div className="flex flex-col gap-3">
      <div id="canvas" style={{ width: size.width, height: size.height }} className="relative overflow-hidden rounded-2xl border bg-white">
        <div className="absolute inset-0" style={{ background: bgVar[bgKey] }} />
        {decorVariant !== 'none' && (
          <div className="absolute inset-0 pointer-events-none opacity-70" style={{ zIndex: 5 }}>
            <ShapeDecor variant={decorVariant} absolute={false} />
          </div>
        )}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
          <div
            className="flex items-center justify-center rounded-full shadow"
            style={{ width: circleSize, height: circleSize, background: 'white', color: '#111827' }}
          >
            <span style={{ fontSize: circleSize * 0.45, lineHeight: 1 }}>{emoji}</span>
          </div>
          <div className="mt-4 font-extrabold tracking-headline headline-stroke" style={{ color: 'var(--rt-off-white)', fontSize: 32 }}>{label}</div>
        </div>
      </div>
    </div>
  )
}
