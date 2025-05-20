import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import icons from "../constants/icons";

type Props = {
  name: string;
  duration: string;
  uri: string;
};

const RecordItem = ({ name, duration, uri }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useAudioPlayer({ uri: uri }, 1);
  const { didJustFinish } = useAudioPlayerStatus(player);

  const playRecord = () => {
    player.seekTo(0);
    setIsPlaying(true);
    player.play();
  };

  const pauseRecord = () => {
    setIsPlaying(false);
    player.pause();
  };

  const deleteRecord = async () => {
    try {
      await FileSystem.deleteAsync(uri);
    } catch {
      alert("Error during delete process");
    }
  };

  useEffect(() => {
    if (didJustFinish) {
      setIsPlaying(false);
    }
  }, [didJustFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        {name} | {duration}
      </Text>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.play}
          onPress={isPlaying ? pauseRecord : playRecord}
        >
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
