# Tutorial code: Leaflet interactive maps (ParkSmart, Milestone 1)

This folder holds the code I wrote while following two official tutorials for
**Leaflet**, the open-source JavaScript library I'm using to build ParkSmart's
interactive campus parking map.

## Where the code came from

| Folder | Tutorial | Source |
|---|---|---|
| `01-quick-start/` | Leaflet Quick Start Guide | https://leafletjs.com/examples/quick-start/ |
| `02-mobile-geolocation/` | Leaflet on Mobile | https://leafletjs.com/examples/mobile/ |

Both tutorials are published by the Leaflet project (Leaflet version 1.9.4,
loaded from the unpkg CDN). The code follows the tutorial snippets step by step,
put together into one runnable page per tutorial. I only added comments that
label each tutorial step.

**One change from the tutorial:** the tutorial loads map tiles from
`tile.openstreetmap.org`, but OpenStreetMap blocks pages opened directly from a
file ("Access blocked"). I switched the tile URL to CARTO's free
OpenStreetMap-based tiles so the pages work when you double-click them.

## What each tutorial covers and why it matters for ParkSmart

**01 - Quick Start**
- Creating a map, centering it and setting the zoom (`L.map().setView()`)
- Adding an OpenStreetMap tile layer
- Markers, circles and polygons → in ParkSmart these become parking lot
  markers, color-coded by availability, and lot outlines
- Popups (`bindPopup`) → lot info such as "42 of 120 spots open"
- Click events (`map.on('click', ...)`) → tapping a lot opens Lot Details

**02 - Mobile + geolocation**
- A fullscreen map sized for phones (viewport meta tag + CSS)
- `map.locate()` and the `locationfound` / `locationerror` events → the
  "you are here" dot and GPS-based recommendations (a stretch goal)

## How to run

No install or build step is needed.

1. Open `01-quick-start/index.html` in a web browser (double-click it).
   Click the marker, circle and polygon to see their popups, then click
   anywhere on the map to see its coordinates.
2. Open `02-mobile-geolocation/index.html` and click **Allow** when the browser
   asks for your location. The map zooms to you and draws an accuracy circle.
   - Some browsers block location on pages opened straight from a file. If that
     happens, serve the folder locally and open
     `http://localhost:8000/02-mobile-geolocation/` instead:
     ```
     python -m http.server 8000
     ```
   - If you click Block, the page shows the error message from the
     `locationerror` handler.

You need an internet connection, because Leaflet and the map tiles load online.

## AI disclosure

I used Claude (Anthropic) to help organize this folder, add the step comments
and write this README. The map code itself comes from the Leaflet tutorials
listed above.
