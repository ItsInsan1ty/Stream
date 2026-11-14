/**
 * CinemaOS -> Nuvio provider scaffold.
 *
 * The APK is a compiled React Native/Expo app, not a source project.
 * No documented, authorized CinemaOS stream API has been verified yet.
 * This scaffold intentionally returns no streams until that interface is
 * established. It must not be enabled expecting playback.
 */
function getStreams(tmdbId, mediaType, season, episode) {
  console.log("[CinemaOS] Experimental scaffold: no resolver configured.");
  return Promise.resolve([]);
}

module.exports = { getStreams };
