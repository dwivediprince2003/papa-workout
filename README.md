# Workout Companion

A guided gym-workout app for beginners. It runs as a Progressive Web App and ships as a lightweight Android app. The plan, exercises and content live in a single JSON file, so updates reach the phone without reinstalling anything.

- **Web app:** https://dwivediprince2003.github.io/workout-companion/
- **Share page (anyone can install):** https://dwivediprince2003.github.io/workout-companion/get/
- **Android APK, personal build:** https://github.com/dwivediprince2003/workout-companion/releases/download/apk/WorkoutCompanion.apk
- **Android APK, shareable build:** https://github.com/dwivediprince2003/workout-companion/releases/download/apk/WorkoutCompanionShare.apk

## Features

- **Guided sessions:** warm-up → each exercise → finisher → summary. One large action button per step ("Set 1 done"), with an automatic rest timer, sound and vibration.
- **Two demo modes:** real gym photos that loop start → finish, or an animation with the working muscles highlighted. A full-length video link is kept as a fallback.
- **Alternatives:** every main exercise lists two or three substitutes ("Machine busy? Do one of these").
- **Exercise library** grouped by muscle (Chest → Middle / Upper / Fly, Back → Lats / Middle / Traps, …), with search and "In your plan" badges.
- **Progress:** warm-up and working sets tracked per day, plus a per-exercise weight log ("Last time: 20 kg") for progressive overload.
- **Schedule engine:** a repeating split (Push → Back → Arms → Legs) that skips rest days, or a fixed weekday plan.
- **Offline-first:** a service worker caches the app and demos; the plan refreshes in the background whenever the app opens.
- **Machine busy?** Swap any exercise for an alternative for today, with one tap to undo.
- **Smart weights:** after the last set, rate it Easy, Good or Hard; next time the app suggests the weight.
- **Gym-friendly:** keeps the screen on during a workout, shows what is up next, and counts workouts in the last 7 days.
- **Shareable copy:** open the app with `?join` and it asks for the user's name; their plan starts on their first day. Progress stays on each phone.
- **Large type and big touch targets**, a dark high-contrast theme, and minimal text.

## How it works

```
plan.json  ──►  index.html (vanilla JS, no build step)  ──►  GitHub Pages
                         ▲
Android app (WebView) ───┘  loads the hosted app, so content updates need no new APK
```

| Path | Purpose |
|---|---|
| `plan.json` | Schedule, workouts, exercises, alternatives and copy. The only file you edit day to day. |
| `index.html` | The whole UI: home, guided session, rest timer, library. |
| `sw.js` | Offline cache (network-first for app/plan, cache-first for demos). |
| `demos/` | Exercise demos: 600 px animated WebP plus 240 px thumbnails; `demos/real/` holds start/finish photos. |
| `get/` | Share page with install links. |
| `android/` | Minimal WebView shell (full screen, back button, full-screen video, external links). |
| `.github/workflows/apk.yml` | Builds and signs both APKs (personal and shareable) and publishes them as the `apk` release when `android/` changes. |

## Editing the plan (`plan.json`)

**Schedule**

```json
"cycle": { "start": "2026-11-14", "order": ["push", "back", "arms", "legs"], "restDays": ["sun"] }
```

The first workout in `order` falls on `start`, and the order repeats from there. Rest days do not advance the cycle. To use a fixed weekday plan instead, replace `cycle` with `"week": { "mon": "push", … }`.

**A workout line**

```json
{ "ex": "lat_pulldown", "warmupSets": 1, "sets": 3, "reps": "12", "rest": 90 }
```

`rest` is in seconds and drives the timer. For time-based items, use `"time": "20 min"` instead of sets and reps.

**An exercise**

```json
"lat_pulldown": {
  "name": "Lat Pulldown",
  "group": "Back", "sub": "Lats (back width)",
  "part": "Back (Lats), Biceps",
  "feel": "Sides of your back, under your arms.",
  "equipment": "Lat pulldown machine",
  "demo": "demos/lat_pulldown.webp", "thumb": "demos/lat_pulldown_t.webp",
  "photos": ["demos/real/lat_pulldown_0.webp", "demos/real/lat_pulldown_1.webp"],
  "video": "https://www.youtube.com/watch?v=…",
  "alts": ["vbar_pulldown", "reverse_grip_pulldown"],
  "steps": ["…"], "mistakes": ["…"], "tip": "…"
}
```

**Publishing:** commit and push. GitHub Pages updates within about a minute, and the app picks up the change the next time it opens.

## Android build

The workflow signs the APK with a key stored as repository secrets (`KEYSTORE_B64`, `KEYSTORE_PASSWORD`). Keep the original keystore backed up, because updates must be signed with the same key. A new APK is only needed when the Android shell itself changes (name, icon, package).

## Credits

- Exercise illustrations: [ExerciseDB](https://exercisedb.dev/) (upscaled with waifu2x).
- Exercise photos: [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (The Unlicense).
- Full-length technique videos: linked from YouTube creators.
