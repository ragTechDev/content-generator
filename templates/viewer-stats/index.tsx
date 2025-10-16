import React from 'react'
import { platformSizes, type PlatformKey } from '@/lib/platformSizes'
import Mascot from '@/components/Mascot'
import ShapeDecor from '@/components/ShapeDecor'

export default function ViewerStats({
  platform,
  views,
  watchTimeHours,
  avgViewDurationSec,
  retentionPct,
  newSubs,
  timeframe = 'Last 7 days',
  celebrate = false,
  decorVariant = 'none',
  eyeState,
  addOns,
}: {
  platform: PlatformKey
  views: number
  watchTimeHours: number
  avgViewDurationSec: number
  retentionPct: number
  newSubs: number
  timeframe?: string
  celebrate?: boolean
  decorVariant?: 'none' | 'playful' | 'tech' | 'games' | 'mascot'
  eyeState?: 'normal' | 'closed' | 'white'
  addOns?: ('anger' | 'teardrop' | 'teardrop-expression' | 'tears-streaming')[]
}) {
  const size = platformSizes[platform]
  const isVertical = size.height > size.width

  const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="rounded-xl border bg-white/80 p-4">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="mt-1 text-3xl font-extrabold" style={{ color: '#111827' }}>{value}</div>
    </div>
  )

  const duration = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}m ${s}s`
  }

  return (
    <div className="flex flex-col gap-3">
      <div id="canvas" style={{ width: size.width, height: size.height }} className="relative overflow-hidden rounded-2xl border">
        {/* background */}
        <div className="absolute inset-0" style={{ background: 'var(--rt-pastel-gray-cyan)' }} />
        {decorVariant !== 'none' && (
          <div className="absolute inset-0 pointer-events-none opacity-70" style={{ zIndex: 5 }}>
            <ShapeDecor variant={decorVariant} absolute={false} />
          </div>
        )}
        {celebrate && (
          <div className="absolute inset-0 opacity-20 text-8xl select-none flex items-center justify-center">🎉🎊✨</div>
        )}

        {/* content */}
        <div className={`absolute inset-0 z-10 p-6 ${isVertical ? 'flex flex-col' : 'grid grid-cols-5 gap-6'}`}>
          <div className={`${isVertical ? '' : 'col-span-3'} min-w-0`}>
            <div className="text-lg text-gray-700">{timeframe}</div>
            <h1 className="mt-1 font-extrabold" style={{ fontSize: isVertical ? 72 : 64, lineHeight: 1, color: '#111827' }}>Viewer Stats</h1>
            <div className={`mt-5 grid ${isVertical ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
              <Stat label="Views" value={views.toLocaleString()} />
              <Stat label="Watch time" value={`${watchTimeHours.toLocaleString()} hrs`} />
              <Stat label="Avg view duration" value={duration(avgViewDurationSec)} />
              <Stat label="Retention" value={`${retentionPct}%`} />
              <Stat label="New subscribers" value={`+${newSubs.toLocaleString()}`} />
            </div>
          </div>
          <div className={`${isVertical ? 'mt-6' : 'col-span-2'} flex items-end justify-end`}>
            <Mascot expression={celebrate ? 'teardrop-expression' : 'none'} eyeState={eyeState} addOns={addOns} size={isVertical ? 360 : 420} />
          </div>
        </div>
      </div>
    </div>
  )
}
