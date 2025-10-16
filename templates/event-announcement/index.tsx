import React from 'react'
import { platformSizes, type PlatformKey } from '@/lib/platformSizes'
import Mascot, { type Expression } from '@/components/Mascot'
import ShapeDecor from '@/components/ShapeDecor'

export type EventKind = 'Livestream' | 'Games Night'

export default function EventAnnouncement({
  platform,
  kind = 'Livestream',
  title,
  subtitle,
  dateTime,
  platformName = 'YouTube',
  cta = 'Set reminder',
  description,
  mascotExpression = 'none',
  cohostLogos = [],
  decorVariant = 'none',
  eyeState,
  addOns,
}: {
  platform: PlatformKey
  kind?: EventKind
  title: string
  subtitle?: string
  dateTime: string
  platformName?: string
  cta?: string
  description?: string
  mascotExpression?: Expression
  cohostLogos?: string[]
  decorVariant?: 'none' | 'playful' | 'tech' | 'games' | 'mascot'
  eyeState?: 'normal' | 'closed' | 'white'
  addOns?: ('anger' | 'teardrop' | 'teardrop-expression' | 'tears-streaming')[]
}) {
  const size = platformSizes[platform]
  const isVertical = size.height > size.width

  return (
    <div className="flex flex-col gap-3">
      <div id="canvas" style={{ width: size.width, height: size.height }} className="relative overflow-hidden rounded-2xl border bg-white">
        {/* background */}
        <div className="absolute inset-0" style={{ background: 'var(--rt-light-lemon)' }} />

        {/* decor (between background and content) */}
        {decorVariant !== 'none' && (
          <div className="absolute inset-0 pointer-events-none opacity-70" style={{ zIndex: 5 }}>
            <ShapeDecor variant={decorVariant} absolute={false} />
          </div>
        )}

        {/* header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: 'var(--rt-light-red)', color: '#111827' }}>{kind}</span>
          </div>
          <div className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--rt-pastel-gray-cyan)', color: '#111827' }}>{platformName}</div>
        </div>

        {/* content */}
        <div className={`absolute inset-0 z-10 p-6 ${isVertical ? 'flex flex-col' : 'grid grid-cols-5 gap-6'}`}>
          <div className={`${isVertical ? '' : 'col-span-3'} min-w-0 mt-16`}>
            <h1 className="font-extrabold" style={{ fontSize: isVertical ? 72 : 64, lineHeight: 1, color: '#111827' }}>{title}</h1>
            {subtitle && <div className="mt-2 text-2xl text-gray-800">{subtitle}</div>}
            <div className="mt-4 text-xl" style={{ color: '#111827' }}>📅 {dateTime}</div>
            {description && <p className="mt-4 text-gray-700 text-lg max-w-prose">{description}</p>}
            <div className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold" style={{ background: 'var(--rt-pastel-orange)' }}>{cta}</div>

            {cohostLogos.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
                {cohostLogos.map((src, i) => (
                  <img key={i} src={src} alt="co-host logo" className="h-12 w-auto object-contain" />
                ))}
              </div>
            )}
          </div>

          <div className={`${isVertical ? 'mt-6' : 'col-span-2'} flex items-end justify-end`}>
            <Mascot expression={mascotExpression} eyeState={eyeState} addOns={addOns} size={isVertical ? 360 : 420} />
          </div>
        </div>
      </div>
    </div>
  )
}
