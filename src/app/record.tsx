import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";
import icons from "../constants/icons";
import { saveRecordingFile } from "../lib/fileSystem";

const Record = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);

  const getPermission = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync();
    if (!status.granted) {
      Alert.alert("Permission to access microphone was denied");
    }
  };

  const record = async () => {
    getPermission();
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    setIsRecording(true);
  };

  const stopRecording = async () => {
    await audioRecorder.stop();
    const { uri } = audioRecorder;
    if (!uri) {
      alert("Error");
      return;
    }
    const filename = `${Date.now()}.m4a`;
    await saveRecordingFile(uri, filename);
    setIsRecording(false);
    alert("Saved");
    router.back();
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>Enregistrer</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>00:00:00</Text>
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
