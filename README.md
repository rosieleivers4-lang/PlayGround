# PlayGround

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://omgithub.com).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://omgithub.com/rosieleivers4-lang/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/rosieleivers4-lang/PlayGround)

- 🎮 [Open the project](https://omgithub.com/rosieleivers4-lang/PlayGround).
- ✨ [Remix this project](https://omgithub.com/?remix=rosieleivers4-lang%2FPlayGround).
- 💻 [Explore the source](https://github.com/rosieleivers4-lang/PlayGround).
- 🛠️ [Check build runs](https://github.com/rosieleivers4-lang/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/rosieleivers4-lang/PlayGround/issues).
- 👤 [Explore the creator's projects](https://omgithub.com/rosieleivers4-lang).
- 🌍 [Create with OMGithub](https://omgithub.com).
<!-- omgithub:readme:end -->

## 🥕 Carrot Runner · East Midlands

A 3D motorbike game built with Vite + Three.js. Ride the Motorbunny Crew bike through a stylised East Midlands, collect golden carrots, trade them for petrol, and keep an eye on the speed limit — the traffic police take it personally.

### Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`). Production build with `npm run build`.

### Controls

- **Keyboard:** `W`/`↑` throttle, `S`/`↓` brake/reverse, `A`/`D` or `←`/`→` steer, `E` refuel at a station, `Esc` pause.
- **Touch:** on-screen steer arrows, **GO** throttle, **BRAKE** pedal.
- **Tilt:** enable *TILT STEER* in the menu. iOS asks for motion permission on the tap.

### Game rules

- Each golden carrot restores **+4 life**.
- **3 carrots → 45 litres** at any Carrot Fuel station. A **5-carrot emergency jerrycan** is available when stranded.
- Speeding fills the heat meter and raises your wanted level. Police chase, steal carrots, damage life, and arrest you if you stop while wanted or run out of life.
- The run ends in a **BUSTED** report. Best run is saved locally.

### Project layout

- `src/game.js` — game state, bike physics, traffic, police, fuel and arrest logic.
- `src/world.js` — procedural East Midlands map, roads, buildings, stations and carrot spawns.
- `src/rider.js` — the photo-inspired Motorbunny rider and bike.
- `src/carrots.js`, `src/vehicles.js`, `src/ui.js`, `src/input.js`, `src/audio.js` — gameplay systems.
- `public/assets/` — neon sleeve and logo textures extracted from the reference photo (`source/` keeps the untouched originals).
