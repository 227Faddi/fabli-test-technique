import { Link } from "expo-router";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecordItem from "../components/RecordItem";
import {
  RecordContext,
  RecordContextType,
} from "../contexts/RecordContextProvider";

const Home = () => {
  const { recordings } = useContext(RecordContext) as RecordContextType;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mes enregistrements</Text>
        <View style={styles.recordList}>
          {recordings.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>No Recordings</Text>
            </View>
          ) : (
            recordings.map((item, index) => (
              <RecordItem
                key={index}
                name={item.name}
                duration={"00:02"}
                uri={item.uri}
              />
            ))
          )}
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
