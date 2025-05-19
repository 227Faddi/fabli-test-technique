import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import icons from "../constants/icons";

type Props = {
  name: string;
  duration: string;
};

const RecordItem = ({ name, duration }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        {name} | {duration}
      </Text>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.play}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? icons.pause : icons.play}
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete}>
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
