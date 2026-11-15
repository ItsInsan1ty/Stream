/**
 * CinemaOS Unified provider for Nuvio.
 *
 * One Nuvio scraper entry aggregates supported, authorized sources
 * returned by the configured backend. This file does not extract URLs
 * from third-party apps or bypass provider access controls.
 */

var API_BASE = "https://YOUR-AUTHORIZED-API-DOMAIN.com";

var SOURCE_LABELS = {
  moviebox: "MovieBox",
  movy: "Movy",
  castle: "Castle",
  febbox: "Febbox",
  hdhub: "HDHub",
  vega: "Vega",
  abyss: "Abyss"
};

function makeRequestUrl(tmdbId, mediaType, season, episode) {
  var params = [
    "tmdbId=" + encodeURIComponent(tmdbId),
    "type=" + encodeURIComponent(mediaType)
  ];

  if (mediaType === "tv") {
    params.push("season=" + encodeURIComponent(season));
    params.push("episode=" + encodeURIComponent(episode));
  }

  return API_BASE.replace(/\/$/, "") + "/streams?" + params.join("&");
}

function normalizeStreams(payload) {
  var items = Array.isArray(payload) ? payload : payload && payload.streams;
  if (!Array.isArray(items)) return [];

  return items.filter(function (item) {
    return item &&
      typeof item.url === "string" &&
      /^https?:\/\//i.test(item.url);
  }).map(function (item) {
    var source = String(item.source || "cinemaos").toLowerCase();
    var label = SOURCE_LABELS[source] || "CinemaOS";

    return {
      name: label,
      title: item.title || item.quality || label,
      url: item.url,
      quality: item.quality || "Unknown",
      type: item.type || "",
      headers: item.headers || {},
      subtitles: Array.isArray(item.subtitles) ? item.subtitles : []
    };
  });
}

function getStreams(tmdbId, mediaType, season, episode) {
  if (API_BASE.indexOf("YOUR-AUTHORIZED-API-DOMAIN") !== -1) {
    console.log("[CinemaOS Unified] Configure an authorized API URL first.");
    return Promise.resolve([]);
  }

  return fetch(makeRequestUrl(tmdbId, mediaType, season, episode))
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Backend returned HTTP " + response.status);
      }
      return response.json();
    })
    .then(normalizeStreams)
    .catch(function (error) {
      console.log("[CinemaOS Unified] " + error.message);
      return [];
    });
}

module.exports = {
  getStreams: getStreams
};
