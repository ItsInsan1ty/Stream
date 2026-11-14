# CinemaOS for Nuvio

Experimental Nuvio plugin repository for investigating a compatible CinemaOS integration.

## Nuvio repository manifest URL

`https://raw.githubusercontent.com/ItsInsan1ty/Stream/main/manifest.json`

**Status:** This is a scaffold only. The provider is disabled and returns an empty stream list. It is not ready for playback.

## Progress

- [x] Add Nuvio plugin manifest using the `scrapers` registry format.
- [x] Add provider module scaffold.
- [ ] Verify a documented and authorized CinemaOS provider/API interface.
- [ ] Implement and test movie and TV stream resolution.
- [ ] Verify subtitles, headers, and playback formats.
- [ ] Assess separate addon support for catalogs, metadata, anime discovery, and live-TV listings.

## Notes

The supplied CinemaOS APK is a compiled React Native/Expo application. Strings and service references found in an APK do not by themselves establish working API contracts or permission to reproduce third-party stream extraction.

Nuvio plugins provide streams. Catalog and metadata functionality may require a separate Stremio-compatible addon or service.

Only integrate services and streams you are authorized to access. This repository does not host media.
