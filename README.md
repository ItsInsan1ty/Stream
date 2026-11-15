# CinemaOS Unified for Nuvio

A single Nuvio JavaScript scraper entry that can display streams from multiple supported, authorized sources returned by a configured backend.

## Install in Nuvio

Add this repository manifest URL in **Profile → Content & Discovery → Plugins**:

`https://raw.githubusercontent.com/ItsInsan1ty/Stream/main/manifest.json`

## Current status

- [x] One unified Nuvio scraper entry
- [x] Normalizes streams from multiple source labels
- [x] Supports movie and TV lookup parameters
- [x] Passes through stream quality, headers, and subtitle metadata
- [ ] Configure a live authorized backend URL
- [ ] Verify real streams and playback in Nuvio

## Backend response contract

The provider expects the configured backend to return JSON in this shape:

```json
{
  "streams": [
    {
      "source": "movy",
      "title": "1080p",
      "quality": "1080p",
      "type": "hls",
      "url": "https://authorized-provider.example/video.m3u8",
      "headers": {},
      "subtitles": []
    }
  ]
}
```

The backend URL is intentionally a placeholder in `providers/cinemaos.js` until a working, authorized API is available. The example URL above is illustrative, not playable.

## Important

The APK is compiled application code. Provider names and URL strings found in it do not establish complete API contracts or permission to reproduce third-party extraction. This repository does not host media and does not bypass DRM, authentication, anti-bot systems, or provider restrictions.
