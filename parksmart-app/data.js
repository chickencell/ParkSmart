// ParkSmart sample data.
// The coordinates are PLACEHOLDERS spread around a campus center point.
// Replace them with real lot and building coordinates from your campus map
// (right-click a spot in Google Maps to copy its latitude, longitude).

const CAMPUS_CENTER = [41.2587, -96.0105]; // map starts here
const START_ZOOM = 16;

// capacity = total spots, permit = who can park there
const LOTS = [
  { id: "A", name: "Lot A", lat: 41.2602, lng: -96.0135, capacity: 120, permit: "Commuter" },
  { id: "B", name: "Lot B", lat: 41.2600, lng: -96.0078, capacity: 90,  permit: "Commuter" },
  { id: "C", name: "Lot C", lat: 41.2575, lng: -96.0128, capacity: 150, permit: "Faculty / Staff" },
  { id: "D", name: "Lot D", lat: 41.2572, lng: -96.0082, capacity: 80,  permit: "Commuter" },
  { id: "E", name: "Lot E", lat: 41.2560, lng: -96.0108, capacity: 100, permit: "Resident" },
];

const BUILDINGS = [
  { name: "Science Hall",        lat: 41.2596, lng: -96.0092 },
  { name: "Social Science Bldg", lat: 41.2581, lng: -96.0096 },
  { name: "Library",             lat: 41.2595, lng: -96.0120 },
  { name: "Student Center",      lat: 41.2583, lng: -96.0117 },
  { name: "Arena",               lat: 41.2566, lng: -96.0094 },
];

// Simulated availability: how full lots usually are at each hour (0 = empty, 1 = full).
// Busiest mid-morning, emptier in the evening.
const HOURLY_FULLNESS = {
  0: .05, 1: .05, 2: .05, 3: .05, 4: .05, 5: .05, 6: .10, 7: .35, 8: .70, 9: .90,
  10: .97, 11: .95, 12: .85, 13: .85, 14: .75, 15: .60, 16: .45, 17: .30,
  18: .25, 19: .20, 20: .15, 21: .10, 22: .05, 23: .05,
};

// Each lot is a bit busier or quieter than average (so they don't all look the same).
const LOT_BUSYNESS = { A: 0.75, B: 1.0, C: 1.1, D: 0.85, E: 0.9 };
