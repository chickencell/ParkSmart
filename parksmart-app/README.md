# ParkSmart - College Parking Finder (prototype)

A simple, phone-sized web app that helps students find an open parking lot near
the building they're going to. It follows the 4-screen lo-fi prototype:

1. **Campus Map** - lots shown as markers, colored by availability (green = open,
   yellow = almost full, red = full), with the number of open spots.
2. **Find a Building** - type to filter the list of buildings.
3. **Best Lots** - the 3 closest lots to that building that still have open spots.
4. **Lot Info** - open spots, permit type, walk times, and a Get Directions button
   that opens Google Maps.

Tapping a lot marker on the map goes straight to Lot Info. Every screen after the
map has a back arrow.

## How to run

Open `index.html` in a web browser. You need an internet connection, because
Leaflet and the map tiles load online. No install or build step is needed.

## Files

| File | What it does |
|---|---|
| `index.html` | The four screens (only one is shown at a time) |
| `style.css` | Layout and colors |
| `data.js` | Lots, buildings and the simulated availability numbers |
| `app.js` | Map, search, ranking lots by walk time, and switching screens |

## Notes

- **Availability is simulated.** Open spots are calculated from the current hour
  (busiest around 10 AM, emptiest at night) and each lot's capacity. No sensors are used.
- **Coordinates are placeholders.** Replace the lot and building positions in
  `data.js` with real ones from the campus map.
- **Walk times** are estimated from straight-line distance at about 80 meters per minute.
- Built with [Leaflet 1.9.4](https://leafletjs.com/) and OpenStreetMap tiles, based on
  the Leaflet Quick Start tutorial (see the `tutorial-leaflet` folder).

## AI disclosure

I used Claude (Anthropic) to help write this prototype code.
