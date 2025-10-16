export type PlatformKey =
  | 'instagram-post'
  | 'instagram-story'
  | 'meetup-banner'
  | 'linkedin-cover'
  | 'youtube-thumbnail'
  | 'vertical-1080x1920'
  | 'youtube-banner'

export const platformSizes: Record<PlatformKey, { width: number; height: number; label: string }> = {
  'instagram-post': { width: 1080, height: 1080, label: 'Instagram Post (1080×1080)' },
  'instagram-story': { width: 1080, height: 1920, label: 'Instagram Story (1080×1920)' },
  'meetup-banner': { width: 1200, height: 675, label: 'Meetup Banner (1200×675)' },
  'linkedin-cover': { width: 1128, height: 191, label: 'LinkedIn Cover (1128×191)' },
  'youtube-thumbnail': { width: 1280, height: 720, label: 'YouTube Thumbnail (1280×720)' },
  'vertical-1080x1920': { width: 1080, height: 1920, label: 'TikTok/Reel/Shorts (1080×1920)' },
  'youtube-banner': { width: 2560, height: 1440, label: 'YouTube Banner (2560×1440)' },
}
