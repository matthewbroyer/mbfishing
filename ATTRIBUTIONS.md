# Attributions and third-party services

Everything the app shows or loads, and where it comes from. Update this file whenever a dependency changes.

## Code shipped with the app (self-hosted in `vendor/`)

| Component | Version | License | What it does | Attribution |
|---|---|---|---|---|
| [Leaflet](https://leafletjs.com) | 1.9.4 | BSD-2-Clause | Map display (pins, popups, controls) | License text in `vendor/LICENSES.txt`; credit link shown on the map |
| [MapLibre GL JS](https://maplibre.org) | 4.7.1 | BSD-3-Clause | Draws the vector map | License text in `vendor/LICENSES.txt` |
| [@maplibre/maplibre-gl-leaflet](https://github.com/maplibre/maplibre-gl-leaflet) | 0.0.22 | ISC | Lets Leaflet show a MapLibre map | License text in `vendor/LICENSES.txt` |

These files are served from the same site as the app. No code is loaded from another server. The BSD licenses require the copyright notice and license text to stay with the files, which `vendor/LICENSES.txt` does. Do not delete it.

## Outside services the app contacts

None of these use accounts or API keys. None are called until the person uses the feature.

| Service | Host | Used for | Receives | Cookies / tracking from the app | Terms / license | Needed to work? |
|---|---|---|---|---|---|---|
| [OpenFreeMap](https://openfreemap.org) | `tiles.openfreemap.org` | Map style, tiles, fonts, sprites | Tile requests for the area on screen, IP address, browser details (uses Cloudflare as a CDN, per its terms) | None set by the app | [ToS](https://openfreemap.org/tos/): free, as-is, may be discontinued | Only for the Map tab background. Pins and logging work without it |
| [Photon](https://photon.komoot.io) (Komoot) | `photon.komoot.io` | Place search | Typed text (3+ characters), location rounded to 0.1° (about 11 km), IP address, browser details | None | Public demo API. README: fair use only, heavy use is throttled or banned, no availability guarantee | No. Coordinates can be pasted instead |
| [Open-Meteo](https://open-meteo.com) | `api.open-meteo.com` | Weather snapshot at trip start | Location rounded to 0.01° (about 1 km), IP address, browser details. Their free-tier logs are kept about 90 days | None | [Terms](https://open-meteo.com/en/terms): free API is for non-commercial use (no ads or subscriptions), under 10,000 calls a day. Data CC BY 4.0, attribution required | No. Can be turned off in More → Settings |
| Google Maps | `www.google.com/maps` | "Directions" link only | Spot coordinates inside the link, when the person taps it (opens a new tab, no referrer sent) | None from the app | Google's terms apply on their site | No |

## Data and attribution wording used

- Map data: © OpenStreetMap contributors, ODbL. Link: https://www.openstreetmap.org/copyright
- Map tiles: © OpenFreeMap, © OpenMapTiles. Both are credited in the map's attribution control and in `privacy.html#credits`.
- Weather: "Weather data by Open-Meteo.com", CC BY 4.0. Credited in `privacy.html#credits` and in the More tab footer.
- Place search: Photon, with OpenStreetMap data. Credited in `privacy.html#credits`.

## Species guide content (`species-data.js`)

The Species tab's text is written in our own words from the pages listed under each species (shown in the app as a numbered "Sources" list with links). Nothing is copied wholesale, and the sources are not affiliated with or endorsing this app. Sources used:

- Take Me Fishing, Recreational Boating & Fishing Foundation: https://www.takemefishing.org
- Maine Dept. of Inland Fisheries & Wildlife, Minnesota DNR, Massachusetts Division of Marine Fisheries, Oregon Dept. of Fish & Wildlife, North Carolina Wildlife Resources Commission, Texas Parks & Wildlife Dept., NOAA Fisheries (specific pages are linked per species)

Rules for adding or editing a species: only cite a page you actually read, tie each line to its source with the `^1,2` markers, and keep wording your own. Regions (`r:` codes) are our own rough grouping, not a range map. Source links open other sites only when tapped, so no new host is needed in the CSP.

## Fonts, images, icons, media

- **Fonts:** none loaded. The app uses the system font stack of the visitor's device.
- **Icons in the interface:** emoji, drawn by the visitor's own device font. No icon library.
- **App icon** (`icon-192.png`, `icon-512.png`): created for this project. No stock or third-party artwork.
- **Fish drawings** (`fish-art.js`): original 8-bit pixel-art illustrations drawn in code for this project. They are simplified, not photos.
- **Photos:** only the visitor's own, stored on their device.
- **Music, video, stock images:** none.

## Things to check yourself

- **Open-Meteo is free for non-commercial use only.** If the app ever gets ads or a paid plan, buy their commercial plan or switch weather providers first.
- **Photon's public server is a fair-use demo.** If traffic grows, run your own Photon instance or use another geocoder.
- **Name and domain:** "mbfishing.online" was not checked against trademark registries. Run a search (USPTO TESS/trademark search and a general web search for "mbfishing") before building a brand around it.
- **Logo, icons and OG image** (`favicon.svg`, `icon-*.png`, `apple-touch-icon.png`, `og-image.png`): original 8-bit pixel art made for this project.
- **Pixel font and weather icons** (`pixel-kit.js`): a 5x7 bitmap font and small icons drawn in code for the share card.
