# TEALFANG · The 500 Wilds

A 3D woodland hunting game for phone, tablet, and desktop. You are a black-hooded pup with teal jaws and a silver-studded harness. Run on all fours, chase live prey, fight predators, and keep eating before the hunger wins.

## Run

```bash
PORT=3002 ./start.sh
```

Open `http://localhost:3002`.

The game is a static ES-module site. Three.js is vendored in `vendor/`, so there is no build step and no external asset download at runtime.

## Controls

- **Touch:** left joystick runs and turns. **PAW** swipes, **BITE** finishes prey or feasts, **DASH** sprints.
- **Keyboard:** WASD / arrows move and turn, Shift dashes, F paws, Space bites, P or Escape pauses.
- **Tilt:** optional accelerometer steering. On iOS, motion permission is requested from the tap on the tilt button. Re-center from the pause menu.

## The hunt

- 500 deterministic wilds, each with its own generated name, biome, light phase, prey mix, and difficulty.
- Vitality drains continuously. Feast on downed animals to restore life and raise maximum vitality for the current wild.
- Paw and bite combos deal more damage. Predators can be eaten too, but only prey count toward the level feast objective.
- Boss predators appear every 25 wilds; every 50th is a stag.
- Progress, best score, and total feasts are stored in `localStorage` under `tealfang.save.v1`.
- `?level=N&play=1` starts a specific wild directly. `window.__tealfang` exposes a small debug API.

## Verification

Playwright screenshots live in `screenshots/`. The renderer is exercised through Chromium with SwiftShader software rendering in this environment.
