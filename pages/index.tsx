import React from 'react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { platformSizes, type PlatformKey } from '@/lib/platformSizes'
import { type Speaker } from '@/templates/event-promo'
import EpisodeRelease, { type EpisodeBadge } from '@/templates/episode-release'
import IGHighlightCover from '@/templates/ig-highlight-cover'
import EventAnnouncement, { type EventKind } from '@/templates/event-announcement'
import ViewerStats from '@/templates/viewer-stats'
import VideoOverlays from '@/templates/video-overlays'
 
import ExportButton from '@/components/ExportButton'
import { Button } from '@/components/ui/button'
import ScaledPreview from '@/components/ScaledPreview'
 

const templates = [
  { key: 'episode-release', label: 'Episode Release' },
  { key: 'ig-highlight', label: 'IG Highlight Cover' },
  { key: 'event-announcement', label: 'Event Announcement' },
  { key: 'viewer-stats', label: 'Viewer Stats' },
  { key: 'video-overlays', label: 'Video Overlays' },
] as const

const platforms: { key: PlatformKey; label: string }[] = [
  { key: 'instagram-post', label: platformSizes['instagram-post'].label },
  { key: 'vertical-1080x1920', label: 'IG Story / TikTok / Reels / Shorts (1080×1920)' },
  { key: 'meetup-banner', label: platformSizes['meetup-banner'].label },
  { key: 'linkedin-cover', label: platformSizes['linkedin-cover'].label },
  { key: 'youtube-thumbnail', label: platformSizes['youtube-thumbnail'].label },
  { key: 'youtube-banner', label: platformSizes['youtube-banner'].label },
]

type TemplateKey = typeof templates[number]['key']

export default function Home() {
  const [template, setTemplate] = useState<TemplateKey>('episode-release')
  const [platform, setPlatform] = useState<PlatformKey>('instagram-post')

  

  // Event promotion state


  const [decorVariant, setDecorVariant] = useState<'none' | 'playful' | 'tech' | 'games' | 'mascot'>('playful')

  // Mascot controls (global)
  type EyeState = 'normal' | 'closed' | 'white'
  type AddOn = 'anger' | 'teardrop' | 'teardrop-expression' | 'tears-streaming'
  const [eyeState, setEyeState] = useState<EyeState>('normal')
  const [addOns, setAddOns] = useState<AddOn[]>([])

  // Episode release slides
  type EpAccent = 'lemon'|'red'|'cyan'|'orange'|'offwhite'|'gray'
  type GuestDetail = { name: string; subtitle?: string; accent?: EpAccent }
  type EpisodeSlide = {
    number: string
    title: string
    guests: GuestDetail[]
    description: string
    cta: string
    badges: EpisodeBadge[]
    expression: 'none'|'anger'|'closed-eye'|'small-eye'|'teardrop'|'teardrop-expression'|'tears-streaming'
    heroImageUrl?: string
    circleAccent?: EpAccent
  }
  const episodeBadgeOptions: EpisodeBadge[] = ['YouTube','Spotify','Apple Podcasts','AntennaPod','iCatcher!']
  const [epSlides, setEpSlides] = useState<EpisodeSlide[]>([{
    number: '12',
    title: 'Debugging Burnout with Kawaii Tech',
    guests: [
      { name: 'Victoria', subtitle: '' },
      { name: 'Natasha', subtitle: '' },
      { name: 'Saloni', subtitle: '' },
    ],
    description: 'We share relatable stories on juggling code, creativity, and community.',
    cta: 'Listen now',
    badges: ['YouTube','Spotify'],
    expression: 'none',
    heroImageUrl: '',
    circleAccent: 'orange',
  }])
  const [epActive] = useState(0)

  // Episode Release compatibility shims (map old variables to epSlides[epActive])
  const epNumber = epSlides[epActive]?.number ?? ''
  const setEpNumber = (v: string) => setEpSlides((prev) => prev.map((s, i) => (i === epActive ? { ...s, number: v } : s)))
  const epTitle = epSlides[epActive]?.title ?? ''
  const setEpTitle = (v: string) => setEpSlides((prev) => prev.map((s, i) => (i === epActive ? { ...s, title: v } : s)))
  const epDescription = epSlides[epActive]?.description ?? ''
  const setEpDescription = (v: string) => setEpSlides((prev) => prev.map((s, i) => (i === epActive ? { ...s, description: v } : s)))
  const epGuests = epSlides[epActive]?.guests ?? []
  const setEpGuests = (updater: (prev: GuestDetail[]) => GuestDetail[]) =>
    setEpSlides((prev) => prev.map((s, i) => (i === epActive ? { ...s, guests: updater(s.guests) } : s)))
  const epBadges = epSlides[epActive]?.badges ?? []
  const setEpBadges = (updater: (prev: EpisodeBadge[]) => EpisodeBadge[]) =>
    setEpSlides((prev) => prev.map((s, i) => (i === epActive ? { ...s, badges: updater(s.badges) } : s)))
  const epCta = epSlides[epActive]?.cta ?? ''
  const setEpCta = (v: string) => setEpSlides((prev) => prev.map((s, i) => (i === epActive ? { ...s, cta: v } : s)))
  const epHeroUrl = epSlides[epActive]?.heroImageUrl ?? ''
  const setEpHeroUrl = (v: string) => setEpSlides((prev) => prev.map((s, i) => (i === epActive ? { ...s, heroImageUrl: v } : s)))
  const epCircleAccent = epSlides[epActive]?.circleAccent ?? 'orange'
  const setEpCircleAccent = (v: EpAccent) => setEpSlides((prev) => prev.map((s, i) => (i === epActive ? { ...s, circleAccent: v } : s)))
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('episodeReleaseHeroImage')
      if (saved && !epHeroUrl) setEpHeroUrl(saved)
    }
  }, [])
  

  // IG Highlight cover state
  const [igLabel, setIgLabel] = useState('Guests')
  const [igEmoji, setIgEmoji] = useState('👩‍💻')
  const [igBg, setIgBg] = useState<'lemon'|'red'|'cyan'|'orange'|'offwhite'|'gray'>('lemon')

  // Event announcement (ragTech) state
  const [eaKind, setEaKind] = useState<EventKind>('Livestream')
  const [eaTitle, setEaTitle] = useState('Live Q&A: Ship Your First AI App')
  const [eaSubtitle, setEaSubtitle] = useState('with ragTech hosts')
  const [eaDateTime, setEaDateTime] = useState('Fri, 1 Nov · 8:00 PM SGT')
  const [eaPlatformName, setEaPlatformName] = useState('YouTube')
  const [eaCta, setEaCta] = useState('Set reminder')
  const [eaDescription, setEaDescription] = useState('Tune in for a friendly, kawaii walkthrough with live questions!')
  const [eaMascotExpression, setEaMascotExpression] = useState<'none'|'anger'|'closed-eye'|'small-eye'|'teardrop'|'teardrop-expression'|'tears-streaming'>('none')
  const [eaCohostLogos, setEaCohostLogos] = useState<string[]>([''])

  // Event announcement carousel (snapshots of current state)
  type EASlide = {
    kind: EventKind
    title: string
    subtitle: string
    dateTime: string
    platformName: string
    cta: string
    description: string
    mascotExpression: typeof eaMascotExpression
    cohostLogos: string[]
  }
  const [eaSlides, setEaSlides] = useState<EASlide[]>([]); void eaSlides; void setEaSlides

  // Viewer stats state
  const [vsViews, setVsViews] = useState(12345)
  const [vsWatchHours, setVsWatchHours] = useState(678)
  const [vsAvgDuration, setVsAvgDuration] = useState(312) // seconds
  const [vsRetention, setVsRetention] = useState(47) // percent
  const [vsSubs, setVsSubs] = useState(128)
  const [vsTimeframe, setVsTimeframe] = useState('Last 7 days')
  const [vsCelebrate, setVsCelebrate] = useState(false)

  // Viewer stats carousel (snapshots of current state)
  type VSSlide = {
    views: number
    watchTimeHours: number
    avgViewDurationSec: number
    retentionPct: number
    newSubs: number
    timeframe: string
    celebrate: boolean
  }
  const [vsSlides, setVsSlides] = useState<VSSlide[]>([]); void vsSlides; void setVsSlides

  // Video overlays state
  type Accent = 'lemon'|'red'|'cyan'|'orange'|'offwhite'|'gray'
  const [ovKind, setOvKind] = useState<'lower-third'|'title-card'|'mascot-only'|'frame'>('lower-third')
  const [ovPrimary, setOvPrimary] = useState('Speaker Name')
  const [ovSecondary, setOvSecondary] = useState('Title / Handle')
  const [ovShowLogo, setOvShowLogo] = useState(true)
  const [ovExpression] = useState<'none'|'anger'|'closed-eye'|'small-eye'|'teardrop'|'teardrop-expression'|'tears-streaming'>('none')
  const [ovAccent, setOvAccent] = useState<Accent>('red')
  const [ovCircleAccent, setOvCircleAccent] = useState<Accent>('red')
  const [ovPadding, setOvPadding] = useState(24)
  const [ovVariant, setOvVariant] = useState<'rounded-8'|'rounded-16'|'rounded-24'>('rounded-16')
  const [ovShadow, setOvShadow] = useState(true)
  const [ovStroke, setOvStroke] = useState(true)
  const [ovSafeZones, setOvSafeZones] = useState(false)

  // Logo customization (applies to all templates)


  const [logoColors, setLogoColors] = useState<{ women: LogoColor; devs: LogoColor; singapore: LogoColor }>({ women: 'navy', devs: 'navy', singapore: 'navy' })

  // Color customizations
  const [eventBgColor, setEventBgColor] = useState<RootColor>('offwhite')
  const [eventCtaColor, setEventCtaColor] = useState<RootColor>('coral')
  const [eventTitleColor, setEventTitleColor] = useState<RootColor>('navy')
  const [alliesBadgeColor, setAlliesBadgeColor] = useState<RootColor>('navy')
  const [nursingBadgeColor, setNursingBadgeColor] = useState<RootColor>('navy')
  const [parentsBadgeColor, setParentsBadgeColor] = useState<RootColor>('navy')
  const [nonCodersBadgeColor, setNonCodersBadgeColor] = useState<RootColor>('navy')

  const fileBase = `${template}-${platform}`
  const palette: LogoColor[] = ['teal','coral','yellow','navy','offwhite']
  const eventOtherOptions: LogoColor[] = palette.filter((c) => c !== eventBgColor)
  const eventLogoOptions: LogoColor[] = palette.filter((c) => c !== eventBgColor)

  

  useEffect(() => {
    if (eventCtaColor === eventBgColor && eventOtherOptions.length) {
      setEventCtaColor(eventOtherOptions[0])
    }
    if (eventTitleColor === eventBgColor && eventOtherOptions.length) {
      setEventTitleColor(eventOtherOptions[0])
    }
    if (alliesBadgeColor === eventBgColor && eventOtherOptions.length) {
      setAlliesBadgeColor(eventOtherOptions[0])
    }
    if (nursingBadgeColor === eventBgColor && eventOtherOptions.length) {
      setNursingBadgeColor(eventOtherOptions[0])
    }
    if (parentsBadgeColor === eventBgColor && eventOtherOptions.length) {
      setParentsBadgeColor(eventOtherOptions[0])
    }
  }, [eventBgColor])

  // Keep logo colors from matching the current template background (simplified)
  useEffect(() => {
    const currentBg = eventBgColor
    const options = eventLogoOptions
    setLogoColors((cur: { women: LogoColor; devs: LogoColor; singapore: LogoColor }) => {
      const next = { ...cur }
      if (next.women === currentBg && options.length) next.women = options[0]
      if (next.devs === currentBg && options.length) next.devs = options[0]
      if (next.singapore === currentBg && options.length) next.singapore = options[0]
      return next
    })
  }, [eventBgColor])

  // Default platform for Video Overlays: use YouTube Thumbnail
  useEffect(() => {
    if (template === 'video-overlays' && platform !== 'youtube-thumbnail') {
      setPlatform('youtube-thumbnail')
    }
  }, [template, platform])

  return (
    <>
      <Head>
        <title>ragTech Content Generator</title>
      </Head>

      <main className="container py-8">
        <h1 className="text-3xl font-extrabold tracking-headline headline-stroke" style={{ color: 'var(--rt-off-white)' }}>ragTech Content Generator</h1>
        <p className="mt-1 text-gray-700">Create kawaii, on-brand visuals for ragTech platforms.</p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4">
            <div className="font-semibold">Template</div>
            <div className="mt-2 flex flex-col gap-2">
              {templates.map((t) => (
                <Button key={t.key} variant={template === t.key ? 'default' : 'outline'} onClick={() => setTemplate(t.key)}>
                  {t.label}
                </Button>
              ))}
            </div>
          <div className="mt-4 font-semibold">Platform</div>
          <div className="mt-2 grid grid-cols-1 gap-2">
            {platforms.map((p) => (
              <Button key={p.key} disabled={template === 'video-overlays'} variant={platform === p.key ? 'default' : 'outline'} onClick={() => setPlatform(p.key)}>
                {p.label}
              </Button>
            ))}
          </div>

          {/* Background Decor for all templates except video overlays */}
          {(['episode-release','ig-highlight','event-announcement','viewer-stats'] as TemplateKey[]).includes(template) && (
            <div className="mt-4">
              <div className="font-semibold">Background Decor</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {([
                  { key: 'none', label: 'None' },
                  { key: 'playful', label: 'Shapes' },
                  { key: 'tech', label: 'Tech Emojis' },
                  { key: 'games', label: 'Game Emojis' },
                  { key: 'mascot', label: 'Mascot' },
                ] as const).map((opt) => (
                  <Button key={opt.key} variant={decorVariant === opt.key ? 'default' : 'outline'} onClick={() => setDecorVariant(opt.key)}>
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {template === 'video-overlays' && (
            <div className="mt-4 space-y-3">
              <div className="font-semibold">Video Overlays</div>
              <div className="flex flex-wrap gap-2">
                {(['lower-third','title-card','mascot-only','frame'] as const).map((k) => (
                  <Button key={k} size="sm" variant={ovKind===k?'default':'outline'} onClick={() => setOvKind(k)}>{k}</Button>
                ))}
              </div>
              {(ovKind==='lower-third' || ovKind==='title-card') && (
                <>
                  <input className="w-full rounded border px-2 py-1" placeholder="Primary text" value={ovPrimary} onChange={(e) => setOvPrimary(e.target.value)} />
                  <input className="w-full rounded border px-2 py-1" placeholder="Secondary text" value={ovSecondary} onChange={(e) => setOvSecondary(e.target.value)} />
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ovShowLogo} onChange={(e) => setOvShowLogo(e.target.checked)} /> Show logo</label>
                </>
              )}
              {ovKind !== 'mascot-only' && (
                <>
                  <div>
                    <div className="font-semibold">Panel variant</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(['rounded-8','rounded-16','rounded-24'] as const).map((v) => (
                        <Button key={v} size="sm" variant={ovVariant===v?'default':'outline'} onClick={() => setOvVariant(v)}>{v}</Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">Accent</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {([
                        {k:'lemon' as Accent,c:'bg-[var(--rt-light-lemon)]',l:'Light Lemon'},
                        {k:'red' as Accent,c:'bg-[var(--rt-light-red)]',l:'Light Red'},
                        {k:'cyan' as Accent,c:'bg-[var(--rt-pastel-gray-cyan)]',l:'Pastel Gray Cyan'},
                        {k:'orange' as Accent,c:'bg-[var(--rt-pastel-orange)]',l:'Pastel Orange'},
                        {k:'offwhite' as Accent,c:'bg-[var(--rt-off-white)]',l:'Off White'},
                        {k:'gray' as Accent,c:'bg-[var(--rt-gray)]',l:'Gray'},
                      ] as const).map((opt) => (
                        <button key={opt.k} type="button" onClick={() => setOvAccent(opt.k)} className={`flex items-center gap-2 rounded border px-2 py-1 ${ovAccent===opt.k?'border-black':'border-gray-300'}`}>
                          <span className={`inline-block h-4 w-4 rounded ${opt.c}`} />
                          <span>{opt.l}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {ovKind==='lower-third' && (
                    <div>
                      <div className="font-semibold">Circle color</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {([
                          {k:'lemon' as Accent,c:'bg-[var(--rt-light-lemon)]',l:'Light Lemon'},
                          {k:'red' as Accent,c:'bg-[var(--rt-light-red)]',l:'Light Red'},
                          {k:'cyan' as Accent,c:'bg-[var(--rt-pastel-gray-cyan)]',l:'Pastel Gray Cyan'},
                          {k:'orange' as Accent,c:'bg-[var(--rt-pastel-orange)]',l:'Pastel Orange'},
                          {k:'offwhite' as Accent,c:'bg-[var(--rt-off-white)]',l:'Off White'},
                          {k:'gray' as Accent,c:'bg-[var(--rt-gray)]',l:'Gray'},
                        ] as const).map((opt) => (
                          <button key={opt.k} type="button" onClick={() => setOvCircleAccent(opt.k)} className={`flex items-center gap-2 rounded border px-2 py-1 ${ovCircleAccent===opt.k?'border-black':'border-gray-300'}`}>
                            <span className={`inline-block h-4 w-4 rounded ${opt.c}`} />
                            <span>{opt.l}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ovShadow} onChange={(e) => setOvShadow(e.target.checked)} /> Shadow</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ovStroke} onChange={(e) => setOvStroke(e.target.checked)} /> Stroke</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={ovSafeZones} onChange={(e) => setOvSafeZones(e.target.checked)} /> Safe zones</label>
              </div>
              {ovKind==='frame' && (
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 text-sm"><span className="w-32">Padding</span><input type="number" className="w-full rounded border px-2 py-1" value={ovPadding} onChange={(e) => setOvPadding(Number(e.target.value))} /></label>
                </div>
              )}
            </div>
          )}

            {/* Mascot controls: show for mascot-using templates; for video overlays only when kind is mascot-only */}
            {((['episode-release','event-announcement','viewer-stats'] as TemplateKey[]).includes(template) || (template === 'video-overlays' && ovKind === 'mascot-only')) && (
              <>
                <div className="mt-6 font-semibold">Mascot Eyes</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {([
                    { key: 'normal' as EyeState, label: 'Normal' },
                    { key: 'closed' as EyeState, label: 'Closed' },
                    { key: 'white' as EyeState, label: 'White' },
                  ] as const).map((opt) => (
                    <Button key={opt.key} size="sm" variant={eyeState === opt.key ? 'default' : 'outline'} onClick={() => setEyeState(opt.key)}>
                      {opt.label}
                    </Button>
                  ))}
                </div>

                <div className="mt-4 font-semibold">Mascot Expressions</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {([
                    { key: 'anger' as AddOn, label: 'Anger' },
                    { key: 'teardrop' as AddOn, label: 'Teardrop' },
                    { key: 'teardrop-expression' as AddOn, label: 'Teardrop Expression' },
                    { key: 'tears-streaming' as AddOn, label: 'Tears Streaming', requiresEye: true },
                  ] as const).map((opt) => {
                    const active = addOns.includes(opt.key)
                    const disabled = opt.key === 'tears-streaming' && eyeState !== 'closed'
                    return (
                      <Button
                        key={opt.key}
                        size="sm"
                        disabled={disabled}
                        variant={active ? 'default' : 'outline'}
                        onClick={() => setAddOns((prev) => active ? prev.filter((a) => a !== opt.key) : [...prev, opt.key])}
                      >
                        {opt.label}
                      </Button>
                    )
                  })}
                </div>
              </>
            )}


            {template === 'episode-release' && (
              <div className="mt-6 space-y-3">
                <div className="font-semibold">Episode Release</div>
                <div className="grid grid-cols-1 gap-2">
                  <input className="w-full rounded border px-2 py-1" placeholder="Episode number" value={epNumber} onChange={(e) => setEpNumber(e.target.value)} />
                  <input className="w-full rounded border px-2 py-1" placeholder="Title" value={epTitle} onChange={(e) => setEpTitle(e.target.value)} />
                  <textarea className="w-full rounded border px-2 py-1" placeholder="Description" value={epDescription} onChange={(e) => setEpDescription(e.target.value)} />
                </div>
                <div>
                  <div className="font-semibold">Guests</div>
                  <div className="mt-2 flex flex-col gap-2">
                    {epGuests.map((g, i) => (
                      <div key={i} className="grid grid-cols-2 gap-2 items-center">
                        <input
                          className="rounded border px-2 py-1"
                          placeholder="Name"
                          value={g.name}
                          onChange={(e) => setEpGuests((prev) => prev.map((x, idx) => idx===i ? { ...x, name: e.target.value } : x))}
                        />
                        <input
                          className="rounded border px-2 py-1"
                          placeholder="Title / Handle"
                          value={g.subtitle || ''}
                          onChange={(e) => setEpGuests((prev) => prev.map((x, idx) => idx===i ? { ...x, subtitle: e.target.value } : x))}
                        />
                        <div className="col-span-2">
                          <div className="text-sm font-semibold">Circle color</div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {([
                              {k:'lemon' as EpAccent,c:'bg-[var(--rt-light-lemon)]',l:'Light Lemon'},
                              {k:'red' as EpAccent,c:'bg-[var(--rt-light-red)]',l:'Light Red'},
                              {k:'cyan' as EpAccent,c:'bg-[var(--rt-pastel-gray-cyan)]',l:'Pastel Gray Cyan'},
                              {k:'orange' as EpAccent,c:'bg-[var(--rt-pastel-orange)]',l:'Pastel Orange'},
                              {k:'offwhite' as EpAccent,c:'bg-[var(--rt-off-white)]',l:'Off White'},
                              {k:'gray' as EpAccent,c:'bg-[var(--rt-gray)]',l:'Gray'},
                            ] as const).map((opt) => (
                              <button key={opt.k} type="button" onClick={() => setEpGuests((prev) => prev.map((x, idx) => idx===i ? { ...x, accent: opt.k } : x))} className={`flex items-center gap-2 rounded border px-2 py-1 ${(g.accent ?? epCircleAccent)===opt.k?'border-black':'border-gray-300'}`}>
                                <span className={`inline-block h-4 w-4 rounded ${opt.c}`} />
                                <span>{opt.l}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Button size="sm" variant="outline" onClick={() => setEpGuests((prev) => prev.filter((_, idx) => idx!==i))}>Remove</Button>
                        </div>
                      </div>
                    ))}
                    <Button size="sm" onClick={() => setEpGuests((prev) => [...prev, { name: 'Guest', subtitle: '', accent: epCircleAccent }])}>Add guest</Button>
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Badges</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {episodeBadgeOptions.map((b) => {
                      const active = epBadges.includes(b)
                      return (
                        <Button key={b} size="sm" variant={active ? 'default' : 'outline'} onClick={() => setEpBadges((prev) => active ? prev.filter((x) => x!==b) : [...prev, b])}>{b}</Button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">CTA</div>
                  <input className="mt-2 w-full rounded border px-2 py-1" placeholder="CTA" value={epCta} onChange={(e) => setEpCta(e.target.value)} />
                </div>
                <div>
                  <div className="font-semibold">Overlay circle color</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {([
                      {k:'lemon' as EpAccent,c:'bg-[var(--rt-light-lemon)]',l:'Light Lemon'},
                      {k:'red' as EpAccent,c:'bg-[var(--rt-light-red)]',l:'Light Red'},
                      {k:'cyan' as EpAccent,c:'bg-[var(--rt-pastel-gray-cyan)]',l:'Pastel Gray Cyan'},
                      {k:'orange' as EpAccent,c:'bg-[var(--rt-pastel-orange)]',l:'Pastel Orange'},
                      {k:'offwhite' as EpAccent,c:'bg-[var(--rt-off-white)]',l:'Off White'},
                      {k:'gray' as EpAccent,c:'bg-[var(--rt-gray)]',l:'Gray'},
                    ] as const).map((opt) => (
                      <button key={opt.k} type="button" onClick={() => setEpCircleAccent(opt.k)} className={`flex items-center gap-2 rounded border px-2 py-1 ${epCircleAccent===opt.k?'border-black':'border-gray-300'}`}>
                        <span className={`inline-block h-4 w-4 rounded ${opt.c}`} />
                        <span>{opt.l}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Hero image URL</div>
                  <input className="mt-2 w-full rounded border px-2 py-1" placeholder="https://..." value={epHeroUrl} onChange={(e) => setEpHeroUrl(e.target.value)} />
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = () => {
                          const dataUrl = reader.result as string
                          setEpHeroUrl(dataUrl)
                          if (typeof window !== 'undefined') {
                            window.localStorage.setItem('episodeReleaseHeroImage', dataUrl)
                          }
                        }
                        reader.readAsDataURL(file)
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          const saved = window.localStorage.getItem('episodeReleaseHeroImage')
                          if (saved) setEpHeroUrl(saved)
                        }
                      }}
                    >Use saved image</Button>
                  </div>
                </div>
                
              </div>
            )}

            {template === 'ig-highlight' && (
              <div className="mt-6 space-y-3">
                <div className="font-semibold">IG Highlight Cover</div>
                <input className="w-full rounded border px-2 py-1" placeholder="Label" value={igLabel} onChange={(e) => setIgLabel(e.target.value)} />
                <input className="w-full rounded border px-2 py-1" placeholder="Emoji" value={igEmoji} onChange={(e) => setIgEmoji(e.target.value)} />
                <div>
                  <div className="font-semibold">Background</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {([
                      {k:'lemon',c:'bg-[var(--rt-light-lemon)]',l:'Light Lemon'},
                      {k:'red',c:'bg-[var(--rt-light-red)]',l:'Light Red'},
                      {k:'cyan',c:'bg-[var(--rt-pastel-gray-cyan)]',l:'Pastel Gray Cyan'},
                      {k:'orange',c:'bg-[var(--rt-pastel-orange)]',l:'Pastel Orange'},
                      {k:'offwhite',c:'bg-[var(--rt-off-white)]',l:'Off White'},
                      {k:'gray',c:'bg-[var(--rt-gray)]',l:'Gray'},
                    ] as const).map((opt) => (
                      <button key={opt.k} type="button" onClick={() => setIgBg(opt.k)} className={`flex items-center gap-2 rounded border px-2 py-1 ${igBg===opt.k?'border-black':'border-gray-300'}`}>
                        <span className={`inline-block h-4 w-4 rounded ${opt.c}`} />
                        <span>{opt.l}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {template === 'event-announcement' && (
              <div className="mt-6 space-y-3">
                <div className="font-semibold">Event Announcement</div>
                <div className="flex gap-2">
                  {(['Livestream','Games Night'] as EventKind[]).map((k) => (
                    <Button key={k} size="sm" variant={eaKind===k?'default':'outline'} onClick={() => setEaKind(k)}>{k}</Button>
                  ))}
                </div>
                <input className="w-full rounded border px-2 py-1" placeholder="Title" value={eaTitle} onChange={(e) => setEaTitle(e.target.value)} />
                <input className="w-full rounded border px-2 py-1" placeholder="Subtitle (optional)" value={eaSubtitle} onChange={(e) => setEaSubtitle(e.target.value)} />
                <input className="w-full rounded border px-2 py-1" placeholder="Date and time" value={eaDateTime} onChange={(e) => setEaDateTime(e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full rounded border px-2 py-1" placeholder="Platform name" value={eaPlatformName} onChange={(e) => setEaPlatformName(e.target.value)} />
                  <input className="w-full rounded border px-2 py-1" placeholder="CTA" value={eaCta} onChange={(e) => setEaCta(e.target.value)} />
                </div>
                <textarea className="w-full rounded border px-2 py-1" placeholder="Description (optional)" value={eaDescription} onChange={(e) => setEaDescription(e.target.value)} />
                <div>
                  <div className="font-semibold">Mascot Expression</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(['none','anger','closed-eye','small-eye','teardrop','teardrop-expression','tears-streaming'] as const).map((ex) => (
                      <Button key={ex} size="sm" variant={eaMascotExpression===ex ? 'default' : 'outline'} onClick={() => setEaMascotExpression(ex)}>{ex}</Button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Co-host Logos</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {eaCohostLogos.map((url, i) => (
                      <input key={i} className="w-full rounded border px-2 py-1" placeholder={`Logo ${i+1} URL`} value={url}
                        onChange={(e) => setEaCohostLogos((prev: string[]) => prev.map((u, idx) => idx === i ? e.target.value : u))} />
                    ))}
                  </div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" onClick={() => setEaCohostLogos((prev) => prev.slice(0, -1))}>Remove last</Button>
                    <Button size="sm" className="ml-2" onClick={() => setEaCohostLogos((prev) => [...prev, ''])}>Add logo</Button>
                  </div>
                </div>

                {/* Carousel removed for Event Announcement */}
              </div>
            )}

            {template === 'viewer-stats' && (
              <div className="mt-6 space-y-3">
                <div className="font-semibold">Viewer Stats</div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 text-sm"><span className="w-32">Views</span><input type="number" className="w-full rounded border px-2 py-1" value={vsViews} onChange={(e) => setVsViews(Number(e.target.value))} /></label>
                  <label className="flex items-center gap-2 text-sm"><span className="w-32">Watch hours</span><input type="number" className="w-full rounded border px-2 py-1" value={vsWatchHours} onChange={(e) => setVsWatchHours(Number(e.target.value))} /></label>
                  <label className="flex items-center gap-2 text-sm"><span className="w-32">Avg duration (sec)</span><input type="number" className="w-full rounded border px-2 py-1" value={vsAvgDuration} onChange={(e) => setVsAvgDuration(Number(e.target.value))} /></label>
                  <label className="flex items-center gap-2 text-sm"><span className="w-32">Retention (%)</span><input type="number" className="w-full rounded border px-2 py-1" value={vsRetention} onChange={(e) => setVsRetention(Number(e.target.value))} /></label>
                  <label className="flex items-center gap-2 text-sm"><span className="w-32">New subs</span><input type="number" className="w-full rounded border px-2 py-1" value={vsSubs} onChange={(e) => setVsSubs(Number(e.target.value))} /></label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full rounded border px-2 py-1" placeholder="Timeframe" value={vsTimeframe} onChange={(e) => setVsTimeframe(e.target.value)} />
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={vsCelebrate} onChange={(e) => setVsCelebrate(e.target.checked)} /> Celebrate</label>
                </div>

                {/* Carousel removed for Viewer Stats */}
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <ExportButton targetId="canvas" fileName={fileBase} />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 rounded-xl border bg-white p-4">
            <ScaledPreview width={platformSizes[platform].width} height={platformSizes[platform].height}>
              <div className="relative w-full h-full">
                {template === 'episode-release' && (
                  <EpisodeRelease
                  platform={platform}
                  episodeNumber={epSlides[epActive]?.number || ''}
                  title={epSlides[epActive]?.title || ''}
                  guests={epSlides[epActive]?.guests || []}
                  description={epSlides[epActive]?.description || ''}
                  ctaText={epSlides[epActive]?.cta || ''}
                  badges={epSlides[epActive]?.badges || []}
                  mascotExpression={epSlides[epActive]?.expression || 'none'}
                  decorVariant={decorVariant}
                  eyeState={eyeState}
                  addOns={addOns}
                  heroImageUrl={epSlides[epActive]?.heroImageUrl || ''}
                  circleAccent={epSlides[epActive]?.circleAccent}
                />
                )}
                {template === 'event-announcement' && (
                  <EventAnnouncement
                  platform={platform}
                  kind={eaKind}
                  title={eaTitle}
                  subtitle={eaSubtitle}
                  dateTime={eaDateTime}
                  platformName={eaPlatformName}
                  cta={eaCta}
                  description={eaDescription}
                  mascotExpression={eaMascotExpression}
                  cohostLogos={eaCohostLogos.filter(Boolean)}
                  decorVariant={decorVariant}
                  eyeState={eyeState}
                  addOns={addOns}
                />
                )}
                {template === 'ig-highlight' && (
                  <IGHighlightCover
                  platform={platform}
                  label={igLabel}
                  emoji={igEmoji}
                  bgKey={igBg}
                  decorVariant={decorVariant}
                />
                )}
                {template === 'viewer-stats' && (
                  <ViewerStats
                  platform={platform}
                  views={vsViews}
                  watchTimeHours={vsWatchHours}
                  avgViewDurationSec={vsAvgDuration}
                  retentionPct={vsRetention}
                  newSubs={vsSubs}
                  timeframe={vsTimeframe}
                  celebrate={vsCelebrate}
                  decorVariant={decorVariant}
                  eyeState={eyeState}
                  addOns={addOns}
                />
                )}
                {template === 'video-overlays' && (
                  <VideoOverlays
                  platform={platform}
                  kind={ovKind}
                  primaryText={ovPrimary}
                  secondaryText={ovSecondary}
                  showLogo={ovShowLogo}
                  expression={ovExpression}
                  accent={ovAccent}
                  circleAccent={ovCircleAccent}
                  framePadding={ovPadding}
                  variant={ovVariant}
                  shadow={ovShadow}
                  stroke={ovStroke}
                  safeZones={ovSafeZones}
                  eyeState={eyeState}
                  addOns={addOns}
                />
                )}

                
              </div>
            </ScaledPreview>
          </div>
        </div>
      </main>
    </>
  )
}
