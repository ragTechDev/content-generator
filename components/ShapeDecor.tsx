import React from 'react'

type Variant = 'none' | 'playful' | 'circles' | 'bars' | 'grid' | 'tech' | 'games' | 'mascot'
type Props = { variant?: Variant; absolute?: boolean }

export default function ShapeDecor({ variant = 'playful', absolute = true }: Props) {
  const containerClass = `${absolute ? 'absolute inset-0 z-0' : ''} h-full w-full pointer-events-none`

  if (variant === 'none') return null

  const renderEmojiTiled = (emojis: string[]) => {
    // Simple tiled grid of emojis
    const cols = 5
    const rows = 5
    const cells = cols * rows // 5x5 grid
    return (
      <div className={containerClass} aria-hidden>
        <div className="grid h-full w-full" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: 16 }}>
          {Array.from({ length: cells }).map((_, i) => (
            <div key={i} className="flex items-center justify-center" style={{ opacity: 0.16 }}>
              <span style={{ fontSize: 56, lineHeight: 1 }}>{emojis[i % emojis.length]}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'tech') {
    return renderEmojiTiled(['🤖', '💻', '🖱️', '⌨️', '👩‍💻', '🖥️'])
  }
  if (variant === 'games') {
    return renderEmojiTiled(['👾', '🕹️', '🃏', '🎱', '🀄'])
  }
  // New mascot decor: tile Capybara SVGs softly in a grid
  if (variant === 'mascot') {
    const cols = 5
    const rows = 5
    const cells = cols * rows
    const src = '/assets/svg/Capybara.svg'
    return (
      <div className={containerClass} aria-hidden>
        <div className="grid h-full w-full" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, gap: 16 }}>
          {Array.from({ length: cells }).map((_, i) => (
            <div key={i} className="flex items-center justify-center" style={{ opacity: 0.16 }}>
              <img src={src} alt="capybara" style={{ width: 72, height: 72, objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (variant === 'playful') {
    return (
      <svg
        aria-hidden
        className={containerClass}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio={absolute ? 'xMidYMid meet' : 'none'}
      >
        <g opacity="0.16">
          {/* Big circle top-left */}
          <circle cx="120" cy="120" r="90" fill="var(--rt-pastel-gray-cyan)" />

          {/* Rounded rect top-right */}
          <rect x="780" y="60" width="140" height="90" rx="28" fill="var(--rt-light-red)" />

          {/* Triangle mid-left */}
          <path d="M80 520 L220 460 L180 620 Z" fill="var(--rt-gray)" />

          {/* Blob-ish path center */}
          <path d="M500 380c60-40 140-20 160 30s-20 120-90 150-150 10-170-40 40-100 100-140Z" fill="var(--rt-light-lemon)" />

          {/* Dots diagonal */}
          {Array.from({ length: 10 }).map((_, i) => (
            <circle key={i} cx={300 + i * 35} cy={120 + i * 22} r="6" fill="var(--rt-gray)" />
          ))}

          {/* Bars bottom-left (offwhite overlay) */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={80 + i * 26} y={820} width="18" height="120" rx="6" fill="var(--rt-off-white)" />
          ))}

          {/* Concentric circles bottom-right */}
          <circle cx="880" cy="860" r="70" fill="none" stroke="var(--rt-pastel-gray-cyan)" strokeWidth="10" />
          <circle cx="880" cy="860" r="40" fill="none" stroke="var(--rt-light-red)" strokeWidth="10" />
        </g>
      </svg>
    )
  }

  // Fallback simple variants
  return (
    <svg aria-hidden className={`${absolute ? 'absolute inset-0 z-0' : ''} h-full w-full opacity-10`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000 1000">
      {variant === 'circles' && (
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="3" fill="var(--wdsg-navy)" />
          </pattern>
        </defs>
      )}
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}
