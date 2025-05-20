import { useAudioPlayer } from "expo-audio";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import icons from "../constants/icons";

type Props = {
  name: string;
  duration: string;
  uri: any;
};

const RecordItem = ({ name, duration, uri }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useAudioPlayer({ uri: uri });

  const playRecord = async () => {
    player.play();
    setIsPlaying(true);
  };

  const deleteRecord = async () => {
    try {
      await FileSystem.deleteAsync(uri);
    } catch {
      alert("Error during delete process");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        {name} | {duration}
      </Text>
      <View style={styles.action}>
        <TouchableOpacity style={styles.play} onPress={playRecord}>
          {isPlaying ? icons.pause : icons.play}
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete} onPress={deleteRecord}>
          {icons.delete}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 12,
  },
  info: {
    color: "#000000",
    fontSize: 16,
    flex: 1,
  },
  action: {
    flexDirection: "row",
    gap: 10,
    marginLeft: 12,
  },
  play: {
    padding: 6,
  },
  delete: {
    padding: 6,
  },
});

export default RecordItem;
