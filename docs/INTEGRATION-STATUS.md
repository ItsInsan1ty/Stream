# CinemaOS integration investigation

## Goal

Provide playable, authorized CinemaOS sources inside Nuvio for movies and TV episodes. Nuvio expects each provider to export `getStreams(tmdbId, mediaType, season, episode)` and return stream objects containing at least `name`, `title`, `url`, and optionally `quality`, `headers`, and `subtitles`.

## Evidence extracted from the supplied APK

The supplied APK contains a React Native / Expo application bundle at `assets/index.android.bundle`. The bundle is Hermes bytecode, not the original source project.

Observed identifiers and host references include:

- `getMovieBoxStream`
- `getMovyStream`
- `getCastleStream`
- `getFebboxStream`
- `getHdhubStream`
- `https://api-in.inmoviebox.com`
- `https://apig.inmoviebox.com`
- `https://www.movy.sx/film-api/v1.9.9/movie?`
- `https://raw.githubusercontent.com/Zenda-Cross/vega-providers/refs/heads/main/urls.json`
- `https://enc-dec.app/api/dec-abyss`

These strings establish that the app references these providers/services. They do **not** reveal complete request schemas, signing/authentication rules, decryption parameters, or a supported public API contract.

## Provider inventory observed in the CinemaOS player UI

The screenshots supplied by the user show:

- MovieBox: MP4 and DASH; visible 1080p and 480p options, plus DASH 1080p/720p/480p.
- Movy: HLS; Miami and Boise show 2160p/1080p/720p/480p in the visible UI; Atlanta shows 1080p/720p/360p; Phoenix shows 1080p.
- Castle: HLS; Multi-audio; 720p.

These are UI observations, not verified direct media URLs or API responses.

## Nuvio provider contract

Nuvio provider modules must be standalone JavaScript files and export `getStreams`. Nuvio's current provider documentation describes this shape:

```js
{
  name: "CVN-CinemaOS-Movy",
  title: "Miami · 2160p · HLS",
  url: "https://authorized-host/path/master.m3u8",
  quality: "2160p",
  headers: { "Referer": "https://authorized-host/" }
}
```

The provider must return actual playable media URLs. A provider label or a URL to an HTML page is not enough.

## Information required from the CinemaOS/provider owner

Before implementing real playback, obtain one of the following for each provider (MovieBox, Movy, Castle):

1. Official API documentation or a sample request/response from an authorized test account; or
2. A supported SDK/library and integration instructions; or
3. A test endpoint and credentials specifically issued for third-party integration.

The contract needs to specify:

- Search/lookup input: TMDB ID, IMDb ID, title/year, or provider-specific content ID.
- Movie vs TV episode lookup fields (season and episode mapping).
- Authentication method and token lifecycle. Do not put private keys, cookies, or user tokens in this public repository.
- Request signing/encryption requirements and permitted client identity.
- Response fields for server name, quality, format, language/audio track, subtitles, direct URL, and required playback headers.
- URL expiry/refresh behavior and geo/device restrictions.
- Confirmation that the API may be called from a third-party Nuvio client.

## Implementation status

The initial `providers/cinemaos.js` is deliberately a disabled scaffold and returns an empty list. It must not be represented as working playback. The real MovieBox, Movy, and Castle providers should only be enabled after their authorized API contracts are available and successful in-app playback has been tested.

## Security

Never commit API secrets, account cookies, bearer tokens, or private signing keys. Use per-user settings only if Nuvio exposes a supported secure settings interface; otherwise use an owner-operated backend with appropriate access controls.
