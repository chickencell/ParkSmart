// ParkSmart - simple 4-screen prototype
// Screens: Campus Map -> Find a Building -> Best Lots -> Lot Info

// ---------- Simulated availability ----------
function openSpots(lot) {
  const hour = new Date().getHours();
  const fullness = Math.min(1, HOURLY_FULLNESS[hour] * LOT_BUSYNESS[lot.id]);
  return Math.round(lot.capacity * (1 - fullness));
}

function status(lot) {
  const open = openSpots(lot);
  if (open === 0) return { label: "FULL", css: "full", color: "#f28b8b" };
  if (open / lot.capacity < 0.25) return { label: "ALMOST FULL", css: "almost", color: "#ffe066" };
  return { label: "OPEN", css: "open", color: "#8fdc9a" };
}

// ---------- Walking time ----------
// Straight-line distance in meters (haversine formula)
function distance(a, b) {
  const R = 6371000, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// About 80 meters per minute walking; at least 1 minute
function walkMinutes(a, b) {
  return Math.max(1, Math.round(distance(a, b) / 80));
}

// ---------- Screen navigation ----------
const navStack = [];

function show(id) {
  const current = document.querySelector(".screen.active");
  if (current && current.id !== id) navStack.push(current.id);
  document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id));
  if (id === "screen-map") {
    map.invalidateSize();  // Leaflet needs this after the map becomes visible again
    drawMarkers();         // refresh numbers
  }
}

function goBack() {
  const prev = navStack.pop() || "screen-map";
  document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === prev));
  if (prev === "screen-map") map.invalidateSize();
}

document.querySelectorAll(".back").forEach(btn => btn.addEventListener("click", goBack));

// ---------- Screen 1: Campus Map ----------
const map = L.map("map").setView(CAMPUS_CENTER, START_ZOOM);

// Map tiles from CARTO (free, based on OpenStreetMap data).
// OpenStreetMap's own tile servers block pages opened straight from a file,
// so this works when you just double-click index.html.
L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
  subdomains: "abcd",
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);

function drawMarkers() {
  markerLayer.clearLayers();
  LOTS.forEach(lot => {
    const st = status(lot);
    const icon = L.divIcon({
      className: "",
      html: `<div class="lot-marker" style="background:${st.color}">${lot.id} ${openSpots(lot)}</div>`,
      iconSize: [52, 26],
      iconAnchor: [26, 13],
    });
    L.marker([lot.lat, lot.lng], { icon, title: `${lot.name}: ${st.label}` })
      .on("click", () => showLotInfo(lot, null))
      .addTo(markerLayer);
  });
}

drawMarkers();

// Zoom so every lot is visible and markers don't overlap
map.fitBounds(LOTS.map(l => [l.lat, l.lng]), { padding: [40, 40] });

document.getElementById("search-bar").addEventListener("click", () => {
  show("screen-search");
  const input = document.getElementById("search-input");
  input.value = "";
  renderBuildings("");
  input.focus();
});

// ---------- Screen 2: Find a Building ----------
const buildingList = document.getElementById("building-list");

function renderBuildings(query) {
  buildingList.innerHTML = "";
  BUILDINGS
    .filter(b => b.name.toLowerCase().includes(query.toLowerCase()))
    .forEach(b => {
      const li = document.createElement("li");
      li.textContent = b.name;
      li.addEventListener("click", () => showBestLots(b));
      buildingList.appendChild(li);
    });
  if (!buildingList.children.length) {
    buildingList.innerHTML = '<p class="hint">No buildings match.</p>';
  }
}

document.getElementById("search-input").addEventListener("input", e => renderBuildings(e.target.value));

// ---------- Screen 3: Best Lots ----------
function showBestLots(building) {
  document.getElementById("lots-title").textContent = "Parking near " + building.name;
  const cards = document.getElementById("lot-cards");
  cards.innerHTML = "";

  LOTS
    .filter(lot => openSpots(lot) > 0)                                  // hide full lots
    .sort((a, b) => walkMinutes(a, building) - walkMinutes(b, building)) // closest first
    .slice(0, 3)                                                         // top 3
    .forEach((lot, i) => {
      const st = status(lot);
      const card = document.createElement("div");
      card.className = "card tap";
      card.innerHTML = `
        <h2>${i + 1}. ${lot.name} <span class="badge ${st.css}">${st.label}</span></h2>
        <p>${openSpots(lot)} of ${lot.capacity} spots open</p>
        <p class="muted">${walkMinutes(lot, building)} min walk</p>`;
      card.addEventListener("click", () => showLotInfo(lot, building));
      cards.appendChild(card);
    });

  if (!cards.children.length) {
    cards.innerHTML = '<p class="hint">All lots are full right now.</p>';
  }
  show("screen-lots");
}

// ---------- Screen 4: Lot Info ----------
function showLotInfo(lot, building) {
  const st = status(lot), open = openSpots(lot);
  document.getElementById("info-title").textContent = lot.name;

  const badge = document.getElementById("info-status");
  badge.textContent = st.label;
  badge.className = "badge " + st.css;

  document.getElementById("info-count").textContent = `${open} / ${lot.capacity}`;
  const bar = document.getElementById("info-bar");
  bar.style.width = (open / lot.capacity * 100) + "%";
  bar.style.background = st.color;

  document.getElementById("info-permit").textContent = lot.permit;

  // Walk times to the two closest buildings (plus the chosen building, if there is one)
  const nearby = [...BUILDINGS].sort((a, b) => distance(lot, a) - distance(lot, b)).slice(0, 2);
  if (building && !nearby.includes(building)) nearby.unshift(building);
  document.getElementById("info-walk").innerHTML =
    nearby.map(b => `${b.name} - ${walkMinutes(lot, b)} min`).join("<br>");

  // Hand off to the phone's maps app (Google Maps link works on Android, iPhone and desktop)
  document.getElementById("info-directions").href =
    `https://www.google.com/maps/dir/?api=1&destination=${lot.lat},${lot.lng}`;

  show("screen-info");
}
