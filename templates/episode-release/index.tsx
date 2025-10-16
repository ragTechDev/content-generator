import React from 'react'
import { platformSizes, type PlatformKey } from '@/lib/platformSizes'
import Mascot, { type Expression } from '@/components/Mascot'
import ShapeDecor from '@/components/ShapeDecor'

export type EpisodeBadge = 'YouTube' | 'Spotify' | 'Apple Podcasts' | 'AntennaPod' | 'iCatcher!'

type GuestDetail = { name: string; subtitle?: string; accent?: Accent }
type Accent = 'lemon' | 'red' | 'cyan' | 'orange' | 'offwhite' | 'gray'
type Props = {
  platform: PlatformKey
  episodeNumber: string
  seasonNumber?: string
  title: string
  guests?: GuestDetail[]
  description?: string
  ctaText?: string
  badges?: EpisodeBadge[]
  mascotExpression?: Expression
  decorVariant?: 'none' | 'playful' | 'tech' | 'games' | 'mascot'
  eyeState?: 'normal' | 'closed' | 'white'
  addOns?: ('anger' | 'teardrop' | 'teardrop-expression' | 'tears-streaming')[]
  heroImageUrl?: string
  circleAccent?: Accent
}

export default function EpisodeRelease({
  platform,
  episodeNumber,
  seasonNumber,
  title,
  guests = [],
  description,
  ctaText = 'Listen now',
  badges = ['YouTube', 'Spotify', 'Apple Podcasts', 'AntennaPod', 'iCatcher!'],
  mascotExpression = 'none',
  decorVariant = 'none',
  eyeState,
  addOns,
  heroImageUrl,
  circleAccent,
}: Props) {
  const size = platformSizes[platform]
  const isVertical = size.height > size.width
  const isVerticalStory = platform === 'vertical-1080x1920' || platform === 'instagram-story'
  const isYouTubeThumb = platform === 'youtube-thumbnail'
  const accentVar: Record<Accent, string> = {
    lemon: 'var(--rt-light-lemon)',
    red: 'var(--rt-light-red)',
    cyan: 'var(--rt-pastel-gray-cyan)',
    orange: 'var(--rt-pastel-orange)',
    offwhite: 'var(--rt-off-white)',
    gray: 'var(--rt-gray)',
  }

  const pill = (label: string) => (
    <span key={label} className="px-4 py-2 rounded-full text-caption font-semibold" style={{ background: 'var(--rt-pastel-gray-cyan)', color: '#111827' }}>
      {label}
    </span>
  )

  return (
    <div className="flex flex-col gap-3">
      <div id="canvas" style={{ width: size.width, height: size.height }} className="relative overflow-hidden rounded-2xl border bg-white">
        {/* background */}
        <div className="absolute inset-0" style={{ background: 'var(--rt-off-white)' }} />

        {/* decor (between background and content) */}
        {decorVariant !== 'none' && (
          <div className="absolute inset-0 pointer-events-none opacity-70" style={{ zIndex: 5 }}>
            <ShapeDecor variant={decorVariant} absolute={false} />
          </div>
        )}

        {/* YouTube thumbnail: centered background image under content, above decor */}
        {isYouTubeThumb && heroImageUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 6 }}>
            <img src={heroImageUrl} alt="episode hero" className="w-full h-full object-contain" />
          </div>
        )}

        {/* content */}
        <div className={`absolute inset-0 z-10 p-6 flex flex-col`}>
          {/* left/title (top area only for non-vertical-story) */}
          {!isVerticalStory && (
            <div className={`min-w-0`}> 
              <div className="t-small font-extrabold tracking-headline headline-stroke text-center" style={{ color: 'var(--rt-off-white)' }}>
                ragTech • {seasonNumber ? `S${seasonNumber} • ` : ''}Episode {episodeNumber}
              </div>
              <h1 className={`mt-2 t-subheading font-extrabold text-gray-700 ${isYouTubeThumb ? 'headline-stroke' : ''}`} style={{ lineHeight: 1, ...(isYouTubeThumb ? { WebkitTextStroke: '3px var(--rt-off-white)' } as React.CSSProperties : {}) }}>{title}</h1>
            </div>
          )}

          {/* body: vertically center for IG Story; otherwise flow as before */}
          <div className={`flex flex-col ${isVerticalStory ? 'flex-1 justify-center' : ''}`}>
            {isVerticalStory && (
              <div className={`min-w-0 text-center`}> 
                <div className="t-small font-extrabold tracking-headline headline-stroke" style={{ color: 'var(--rt-off-white)' }}>
                  ragTech • {seasonNumber ? `S${seasonNumber} • ` : ''}Episode {episodeNumber}
                </div>
                <h1 className={`mt-2 t-subheading font-extrabold text-gray-700 ${isYouTubeThumb ? 'headline-stroke' : ''}`} style={{ lineHeight: 1, ...(isYouTubeThumb ? { WebkitTextStroke: '3px var(--rt-off-white)' } as React.CSSProperties : {}) }}>{title}</h1>
              </div>
            )}
            {description && !isYouTubeThumb && (
              <p className="mt-4 text-gray-700 t-caption max-w-prose text-center">{description}</p>
            )}

            {/* right/mascot (hide on YouTube thumbnail to avoid covering image) */}
            {!isYouTubeThumb && (
              <div className={`flex items-end justify-end absolute bottom-0 right-0`} style={{ zIndex: 2 }}>
                <Mascot expression={mascotExpression} eyeState={eyeState} addOns={addOns} size={isVertical ? 500 : 350} />
              </div>
            )}

            {/* full-width image frame below CTA (spans across width). Hidden on YouTube thumbnail */}
            {heroImageUrl && !isYouTubeThumb && (
              <div className={`mt-2 ${isVertical ? '' : 'col-span-5'} rounded-xl overflow-hidden relative`} style={{ gridColumn: isVertical ? undefined : '1 / -1', zIndex: 1, height: isYouTubeThumb ? `${size.height - 140}px` : undefined }}>
                <div className={`relative w-full`} style={{ paddingBottom: isVertical ? '70%' : '60%' }}>
                  <img
                    src={heroImageUrl}
                    alt="episode hero"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* stacked lower-third overlays over the image (hidden on YouTube thumbnail) */}
                  {guests.length > 0 && !isYouTubeThumb && (
                    <div className="absolute left-0 right-0 bottom-0 flex flex-row items-center justify-between gap-3 p-4" style={{ zIndex: 2, height: isVerticalStory ? '33%' : '70%' }}>
                      {guests.map((g, idx) => (
                        <div key={idx} className="flex items-center gap-3 flex-1" style={{
                          padding: '10px 14px',
                          background: 'rgba(255, 255, 255, 0.94)',
                          borderRadius: 16,
                          border: '2px solid rgba(17, 24, 39, 0.12)',
                          boxShadow: '0 8px 24px rgba(17,24,39,0.18)',
                        }}>
                          <div>
                            <div className="font-extrabold" style={{ color: '#111827', fontSize: 28 }}>{g.name}</div>
                            {g.subtitle && <div className="-mt-1 text-sm" style={{ color: '#374151' }}>{g.subtitle}</div>}
                          </div>
                          <div className="ml-auto h-8 w-8 rounded-full" style={{ background: accentVar[(g.accent ?? circleAccent ?? 'orange') as Accent] }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* YouTube thumbnail overlays: show over background image */}
            {isYouTubeThumb && guests.length > 0 && (
              <div className="absolute left-0 right-0 bottom-0 flex flex-row items-center justify-between gap-3 p-6" style={{ zIndex: 10 }}>
                {guests.map((g, idx) => (
                  <div key={idx} className="flex items-center gap-3 flex-1" style={{
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.94)',
                    borderRadius: 16,
                    border: '2px solid rgba(17, 24, 39, 0.12)',
                    boxShadow: '0 8px 24px rgba(17,24,39,0.18)',
                  }}>
                    <div>
                      <div className="font-extrabold" style={{ color: '#111827', fontSize: 28 }}>{g.name}</div>
                      {g.subtitle && <div className="-mt-1 text-sm" style={{ color: '#374151' }}>{g.subtitle}</div>}
                    </div>
                    <div className="ml-auto h-8 w-8 rounded-full" style={{ background: accentVar[(g.accent ?? circleAccent ?? 'orange') as Accent] }} />
                  </div>
                ))}
              </div>
            )}

            {!isYouTubeThumb && (
            <div className="flex flex-col mt-3">
              <div 
              className="inline-flex items-center justify-center rounded-full px-6 py-3 t-medium text-white font-semibold" 
              style={{ background: 'var(--rt-light-red)' }}
              >
              {ctaText}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 justify-center align-middle">
                {badges.map((b) => pill(b))}
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
