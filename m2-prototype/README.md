# Milestone 2: runnable paper prototype

A clickable version of the refined ParkSmart lo-fi sketches. Each screen is a
hand-drawn style sketch, and invisible "tap areas" on top of it move you to the next
screen, the same way someone would swap paper screens in a paper-prototype test.

## How to run

Open `index.html` in a web browser (works offline). Click the sketch where you would
tap a phone. Tick **Show tap areas** to see what's clickable, and **Restart** to go
back to the Campus Map.

## Screens

| File | Screen |
|---|---|
| `screens/m2_1_map.png` | Campus Map |
| `screens/m2_2_popup.png` | Campus Map with a lot preview card (after tapping a marker) |
| `screens/m2_3_search.png` | Find a Building (recent + all buildings) |
| `screens/m2_4_lots.png` | Best Lots near Science Hall |
| `screens/m2_5_info.png` | Lot Info |
| `screens/m2_6_full.png` | All lots near the Arena are full |

## Paths to try

- **Find parking for class:** search bar → Science Hall → Lot A → Get Directions
- **Check a lot from the map:** tap a lot marker → See details
- **Everything is full:** search bar → Arena → Lot A (closest lot with space)

Like a paper prototype, this is a "Wizard of Oz" mock: every marker opens the Lot A
preview, and the numbers are made up.
