# Workout Plan — App guide

- **Live app:** https://dwivediprince2003.github.io/papa-workout/
- **Android APK (hamesha latest):** https://github.com/dwivediprince2003/papa-workout/releases/download/apk/Workout.apk

## Update kaise karein
1. `plan.json` edit karo (ya Claude ko bolo).
2. `git add -A && git commit -m "Update plan" && git push`
3. 1–2 minute me GitHub Pages update ho jata hai. Papa ka app agli baar khulne pe naya plan dikhayega. **APK dobara install nahi karni.**

Nayi APK sirf tab banti hai jab `android/` folder badle (app ka naam/icon). Wo GitHub Actions apne aap banata hai aur upar wale same link pe daal deta hai.
APK signing key: `~/.papa-workout-keys/` (Mac pe). **Isse delete mat karna** — iske bina future APK purani app ke upar install nahi hogi.

Simple mobile web-app (PWA). Phone pe link kholo → "Add to Home Screen" → normal app jaisa icon ban jata hai.
Koi App Store / Play Store nahi chahiye. App ki language: simple English.

## Files

| File | Kya hai |
|---|---|
| `plan.json` | **Sirf yahi file edit karni hai.** Saara plan, exercises, videos isme hain. |
| `index.html` | App ka code (chhedne ki zaroorat nahi) |
| `manifest.json`, `sw.js`, `icon-*.png` | Phone pe install + offline ke liye |

## Plan kaise badlein (`plan.json`)

### Top
```json
"greeting": "Hello Papa",
"message": "Start slow. Use light weight. Stop if you feel pain."
```
`message` = home screen pe dikhne wala tip.

### 1. Kaunse din kya karna hai — `week`
```json
"week": { "mon": "push", "tue": "pull", "wed": "legs", "thu": "push", "fri": "pull", "sat": "legs", "sun": "rest" }
```
Kisi bhi din ko kisi bhi workout se jod do. Naya workout (jaise `"full"` ya `"cardio"`) banana ho to `workouts` me add karo aur yahan naam likh do.

### 2. Workout — `workouts`
```json
"push": { "name": "Push Day", "focus": "Chest, Shoulders, Triceps", "color": "#D9532B",
          "warmup": [...], "main": [...], "cooldown": [...] }
```
Har exercise line:
```json
{ "ex": "lat_pulldown", "sets": 3, "reps": "12", "rest": 90, "note": "Use light weight" }
```
- `ex` = exercise ki id (neeche `exercises` se)
- `sets` · `reps` (text bhi chalega: `"10 each arm"`) · `rest` = aaram **seconds** me (timer isi se chalta hai)
- `note` (optional) = papa ke liye special message
- Warm-up/cool-down me `sets` ki jagah `"time": "3 min"` ya `"reps": "15"` likh sakte ho

### 3. Exercise — `exercises`
```json
"lat_pulldown": {
  "name": "Lat Pulldown",
  "about": "Pull the bar down to your chest",
  "group": "Back",                 // "All Exercises" me isi group me dikhega
  "part": "Back (Lats), Biceps",   // "Works on"
  "equipment": "Lat pulldown machine",
  "video": "https://www.youtube.com/watch?v=SALxEARiMkw",
  "steps": ["...", "..."],
  "mistakes": ["..."],
  "tip": "..."                     // optional
}
```
Video badalna ho → bas YouTube link paste karo (normal, `youtu.be` ya `shorts` — sab chalega).

## Update papa ke phone tak kaise pahunchta hai
App har baar khulne pe `plan.json` naya fetch karta hai. File update karke publish karo → papa jab app kholenge,
naya plan aa jayega aur green message dikhega **"✓ Your plan was updated"**. Internet na ho to last saved plan dikhta hai.

## Local preview
```bash
python3 -m http.server 8765
```
phir browser me `http://localhost:8765`.
