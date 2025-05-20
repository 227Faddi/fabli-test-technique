import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import * as FileSystem from "expo-file-system";
import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import icons from "../constants/icons";
import {
  RecordContext,
  RecordContextType,
  Recordings,
} from "../contexts/RecordContextProvider";
import { getSavedRecordings } from "../lib/fileSystem";

type Props = {
  name: string;
  duration: string;
  uri: string;
};

const RecordItem = ({ name, duration, uri }: Props) => {
  const { setRecordings, currentPlayingUri, setCurrentPlayingUri } = useContext(
    RecordContext
  ) as RecordContextType;
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useAudioPlayer({ uri: uri }, 1);
  const { didJustFinish } = useAudioPlayerStatus(player);

  const playRecord = () => {
    player.seekTo(0);
    setIsPlaying(true);
    player.play();
    setCurrentPlayingUri(uri);
  };

  const pauseRecord = () => {
    setIsPlaying(false);
    player.pause();
    setCurrentPlayingUri(null);
  };

  const deleteRecord = () => {
    Alert.alert("Supprimer l'enregistrement", "Êtes-vous sûr?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(uri);
            const newRecordings = await getSavedRecordings();
            setRecordings(newRecordings as Recordings);
          } catch {
            alert("Error during delete process");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (didJustFinish) {
      setIsPlaying(false);
      setCurrentPlayingUri(null);
    }
  }, [didJustFinish, setCurrentPlayingUri]);

  useEffect(() => {
    if (currentPlayingUri !== uri && isPlaying) {
      pauseRecord();
    }
  }, [currentPlayingUri, uri, isPlaying]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.info}>{name}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
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
    fontSize: 16,
    flex: 1,
  },
  duration: {
    fontWeight: "bold",
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
