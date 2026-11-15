
/**
 * CinemaOS-compatible Nuvio provider
 *
 * Connects to an authorized API that returns playable stream URLs.
 * This is an adapter template, not a CinemaOS stream extractor.
 */

var API_BASE = "https://YOUR-AUTHORIZED-API-DOMAIN.com";

function getStreams(tmdbId, mediaType, season, episode) {
  if (API_BASE.indexOf("YOUR-AUTHORIZED") !== -1) {
    console.log("[CinemaOS] API endpoint not configured.");
    return Promise.resolve([]);
  }

  var params = [
    "tmdbId=" + encodeURIComponent(tmdbId),
    "type=" + encodeURIComponent(mediaType)
  ];

  if (mediaType === "tv") {
    params.push("season=" + encodeURIComponent(season));
    params.push("episode=" + encodeURIComponent(episode));
  }

  var url = API_BASE + "/streams?" + params.join("&");

  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("API returned " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      var streams = Array.isArray(data) ? data : data.streams;

      if (!Array.isArray(streams)) return [];

      return streams
        .filter(function (stream) {
          return stream && typeof stream.url === "string" &&
            /^https?:\/\//i.test(stream.url);
        })
        .map(function (stream) {
          return {
            name: "CinemaOS",
            title: stream.title || stream.quality || "Available stream",
            url: stream.url,
            quality: stream.quality || "Unknown",
            headers: stream.headers || {}
          };
        });
    })
    .catch(function (error) {
      console.log("[CinemaOS] " + error.message);
      return [];
    });
}

module.exports = {
  getStreams: getStreams
};
