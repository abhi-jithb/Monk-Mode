import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Tts from "react-native-tts";

Tts.setDefaultLanguage("en-US");
Tts.setDefaultRate(0.35);
Tts.setDefaultPitch(0.65);

const steps = [
  { name: "Preparation", duration: 60, startMsg: "Preparation started", endMsg: "Preparation ended" },
  { name: "Pranayama", duration: 300, startMsg: "Pranayama started", endMsg: "Pranayama done" },
  { name: "Dhyana", duration: 600, startMsg: "Meditation started", endMsg: "Meditation done" },
  { name: "Ending", duration: 180, startMsg: "Session complete", endMsg: "Session complete" },
];

export default function MeditationApp() {
  const [currentStep, setCurrentStep] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);

  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Animate button opacity on press for smooth feedback
  const handlePressIn = () => {
    Animated.timing(opacityAnim, { toValue: 0.6, duration: 150, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacityAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  const speak = async (msg) => {
    await Tts.stop();
    await Tts.speak(msg);
  };

  const startStep = (index) => {
    if (index < steps.length) {
      const step = steps[index];
      setCurrentStep(index);
      setTimeLeft(step.duration);
      speak(step.startMsg);
      setRunning(true);
    } else {
      setRunning(false);
      setCurrentStep(null);
      speak("Meditation session completed. Namaste.");
    }
  };

  // Timer countdown
  useEffect(() => {
    let timer;
    if (running && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (running && timeLeft === 0) {
      const step = steps[currentStep];
      speak(step.endMsg);
      setTimeout(() => startStep(currentStep + 1), 3500);
    }
    return () => clearInterval(timer);
  }, [running, timeLeft]);

  const pauseTimer = () => {
    setRunning(false);
  };

  const resumeTimer = () => {
    if (currentStep !== null) setRunning(true);
  };

  const resetTimer = () => {
    setRunning(false);
    setCurrentStep(null);
    setTimeLeft(0);
    Tts.stop();
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meditation</Text>

      <View style={styles.card}>
        <Text style={styles.stepName}>{currentStep !== null ? steps[currentStep].name : "Ready"}</Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      </View>

      <View style={styles.controls}>
        {currentStep === null && (
          <AnimatedTouchable
            style={[styles.button, { opacity: opacityAnim }]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => startStep(0)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Start</Text>
          </AnimatedTouchable>
        )}

        {currentStep !== null && running && (
          <AnimatedTouchable
            style={[styles.button, styles.pauseButton, { opacity: opacityAnim }]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={pauseTimer}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </AnimatedTouchable>
        )}

        {currentStep !== null && !running && timeLeft > 0 && (
          <AnimatedTouchable
            style={[styles.button, styles.resumeButton, { opacity: opacityAnim }]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={resumeTimer}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Resume</Text>
          </AnimatedTouchable>
        )}

        {(currentStep !== null || timeLeft > 0) && (
          <AnimatedTouchable
            style={[styles.button, styles.resetButton, { opacity: opacityAnim }]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={resetTimer}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </AnimatedTouchable>
        )}
      </View>
    </View>
  );
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  card: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#111",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "#fff",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  stepName: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
  },
  timer: {
    fontSize: 72,
    color: "#fff",
    fontWeight: "300",
    fontVariant: ["tabular-nums"],
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#222",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  pauseButton: {
    backgroundColor: "#555",
  },
  resumeButton: {
    backgroundColor: "#0a84ff",
  },
  resetButton: {
    backgroundColor: "#b52424",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
