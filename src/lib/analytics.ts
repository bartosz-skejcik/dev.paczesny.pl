export type AnalyticsEvent = "related_posts_impression" | "related_post_click"

export function trackAnalyticsEvent(
  eventName: AnalyticsEvent,
  payload?: Record<string, unknown>
) {
  if (typeof window === "undefined") {
    return
  }

  const tracker = getTracker()

  if (tracker) {
    tracker(eventName, payload)
    return
  }

  window.dispatchEvent(
    new CustomEvent("analytics:event", {
      detail: {
        name: eventName,
        payload,
      },
    })
  )
}

function getTracker():
  | ((eventName: string, payload?: Record<string, unknown>) => void)
  | null {
  if (typeof window === "undefined") {
    return null
  }

  if (typeof window.va === "function") {
    return (eventName, payload) => {
      window.va?.("event", {
        name: eventName,
        data: payload,
      })
    }
  }

  if (typeof window.analytics?.track === "function") {
    return window.analytics.track.bind(window.analytics)
  }

  return null
}

declare global {
  interface Window {
    analytics?: {
      track: (name: string, payload?: Record<string, unknown>) => void
    }
  }
}
