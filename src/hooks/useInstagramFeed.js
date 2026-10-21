import { useEffect, useState } from 'react'
import { INSTAGRAM_FEED } from '../data/site.js'

/* the caption's first line (usually the post's title), for the image's alt text */
const firstLine = (caption) => caption?.split('\n').find((line) => line.trim())?.trim() ?? ''

/** A Behold post → a Carousel slide; videos show a still (thumbnail) with a play badge, never autoplay. */
const toSlide = (post) => {
  const image = post.sizes?.medium?.mediaUrl ?? (post.mediaType === 'VIDEO' ? post.thumbnailUrl : post.mediaUrl)
  // posts come in 4:5, 1:1 or landscape; `contain` shows each whole (captions are often written on the image)
  return image && { src: image, alt: firstLine(post.prunedCaption ?? post.caption) || 'Instagram post', href: post.permalink, video: post.mediaType === 'VIDEO', contain: true }
}

/**
 * The latest Instagram posts as Carousel slides, read in the browser from the Behold JSON feed
 * (a public URL with no token). null while loading or when the feed fails, so callers keep their fallback.
 */
export default function useInstagramFeed(limit = 6) {
  const [slides, setSlides] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(INSTAGRAM_FEED, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.statusText))))
      .then(({ posts = [] }) => {
        const next = posts.map(toSlide).filter(Boolean).slice(0, limit)
        if (next.length) setSlides(next)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [limit])

  return slides
}
