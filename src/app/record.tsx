import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";
import icons from "../constants/icons";

const Record = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
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
          onPress={() => setIsRecording(!isRecording)}
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
