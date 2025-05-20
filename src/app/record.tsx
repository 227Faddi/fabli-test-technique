import { RecordingPresets, useAudioRecorder } from "expo-audio";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../components/BackButton";
import icons from "../constants/icons";
import { saveRecordingFile } from "../lib/fileSystem";
import { formatTime, generateFileName } from "../lib/format";
import { getPermission } from "../lib/permission";

const Record = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const record = async () => {
    const hasPermission = await getPermission();

    if (!hasPermission) {
      Alert.alert(
        "Microphone Permission Required",
        "Please enable microphone access in settings.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () => {
              if (Platform.OS === "ios") {
                Linking.openURL("app-settings:");
              } else {
                Linking.openSettings();
              }
            },
          },
        ]
      );
      return;
    }

    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = async () => {
    await audioRecorder.stop();
    const { uri } = audioRecorder;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!uri) {
      alert("Error");
      return;
    }
    const filename = generateFileName();
    await saveRecordingFile(uri, filename);
    setIsRecording(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Enregistrer</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(elapsedSeconds)}</Text>
      </View>
      <View style={styles.recordBtnContainer}>
        <TouchableOpacity
          style={styles.recordBtn}
          onPress={isRecording ? stopRecording : record}
        >
          {isRecording ? icons.stop : icons.mic}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    gap: 36,
  },
  title: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  timeContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  time: { fontSize: 50, fontWeight: "bold" },
  recordBtnContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  recordBtn: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 26,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Record;
