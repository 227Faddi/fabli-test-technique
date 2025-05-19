import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecordItem from "../components/RecordItem";

const Home = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mes enregistrements</Text>
        <View style={styles.recordList}>
          <RecordItem name={"Audio-01"} duration={"00:20"} />
          <RecordItem name={"Audio-01"} duration={"00:20"} />
          <RecordItem name={"Audio-01"} duration={"00:20"} />
          <RecordItem name={"Audio-01"} duration={"00:20"} />
        </View>
        <View style={styles.recordBtnContainer}>
          <Link href="/record" style={styles.recordBtn}>
            Enregistrer
          </Link>
        </View>
      </View>
    </ScrollView>
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
  recordList: { flex: 1, gap: 4 },
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

export default Home;
