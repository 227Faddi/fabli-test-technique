import {
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
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
import {
  RecordContext,
  RecordContextType,
  Recordings,
} from "../contexts/RecordContextProvider";
import { getSavedRecordings, saveRecordingFile } from "../lib/fileSystem";
import { formatTime, generateFileName } from "../lib/format";
import { getPermission } from "../lib/permission";

const Record = () => {
  const { setRecordings, setCurrentPlayingUri } = useContext(
    RecordContext
  ) as RecordContextType;
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const { durationMillis } = useAudioRecorderState(audioRecorder, 500);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const record = async () => {
    const hasPermission = await getPermission();

    if (!hasPermission) {
      Alert.alert(
        "Autorisation du microphone requise",
        "Veuillez activer l'accès au microphone dans les paramètres.",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Ouvrir les paramètres",
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

    const filename = generateFileName(durationMillis);

    await saveRecordingFile(uri, filename);

    const newRecordings = await getSavedRecordings();
    setRecordings(newRecordings as Recordings);

    setIsRecording(false);
    router.back();
  };

  useEffect(() => {
    setCurrentPlayingUri(null);
  }, [setCurrentPlayingUri]);

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
