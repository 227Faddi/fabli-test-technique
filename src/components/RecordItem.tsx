import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  name: string;
  duratiion: string;
};

const RecordItem = ({ name, duratiion }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        {name} | {duratiion}
      </Text>
      <View style={styles.action}>
        <TouchableOpacity style={styles.play}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.delete}>
          <Text>Stop</Text>
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
    padding: 12,
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
