# 🧘 Monk Mode — Meditation App

A simple, calm, and distraction-free **React Native** app built to guide you through a complete 20-minute meditation session — including **Preparation**, **Pranayama**, and **Dhyana** — with smooth voice instructions and timers.

---

## 🌸 Features

- 🕉️ Guided meditation flow (Preparation → Pranayama → Dhyana → Ending)
- 🔊 Voice prompts for each phase (no overlaps)
- ⏱️ Automatic timers with soft transitions
- 🎧 Calm and focused UI design (dark theme with smooth visuals)
- 🚀 Works completely offline — no distractions, no database
- 🧩 Simple to customize duration, voice rate, and pitch

---

## 🛠️ Tech Stack

- **React Native CLI**
- **React Hooks** (`useState`, `useEffect`, `useRef`)
- **react-native-tts** (Text-to-Speech)
- **Animated API** for button feedback

---

## 📋 Project Structure

```

MeditationApp/
├── android/
├── ios/
├── assets/
│ └── images/
│ └── app_logo.png
├── App.js
└── README.md

```

---

## ⚙️ Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/abhi-jithb/Monk-Mode.git
   cd Monk-Mode
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run on Android**

   ```bash
   npx react-native run-android
   ```

4. **Run on iOS (optional)**

   ```bash
   npx react-native run-ios
   ```

---

## 📱 Building APK

To generate your own `.apk` file:

```bash
cd android
./gradlew assembleRelease
```

### Your APK will be available at:

```bash
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🎨 Customizing the App Icon

If you want to use your own logo:

1. Replace all `ic_launcher.png` files under
   `android/app/src/main/res/mipmap-*`
2. Keep the same file names.
3. Rebuild the app:

   ```bash
   cd android && ./gradlew clean && cd .. && npx react-native run-android
   ```

---

## 💫 Future Ideas

- Add background breathing animations
- Integrate daily streak tracker
- Include ambient background sound
- Save user’s meditation history (optional)

---

## 🌿 Inspiration

This project was built to **master mindfulness, emotions, and inner calm** — turning a phone into a simple, focused meditation tool.

> _“Peace is not in a place, it’s in a practice.”_

---

## 👨‍💻 Author

**Abhijith B**
🕊️ [LinkedIn](https://linkedin.com/in/abhi-jithb)
🌱 Developer | Creator of Monk Mode

---

## 🪷 License

This project is open-source under the **MIT License**.

```


```
