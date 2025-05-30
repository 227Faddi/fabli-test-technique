import { router } from "expo-router";
import { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RecordItem from "../components/RecordItem";
import {
  RecordContext,
  RecordContextType,
} from "../contexts/RecordContextProvider";
import { formatDuration } from "../lib/format";

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
              <Text style={styles.recordMessage}>
                Vous n’avez encore aucun enregistrement.
              </Text>
            </View>
          ) : (
            recordings
              .sort((a, b) => b.name.localeCompare(a.name))
              .map((item) => (
                <RecordItem
                  key={item.name}
                  name={item.name.replace(".m4a", "")}
                  duration={formatDuration(item.name)}
                  uri={item.uri}
                />
              ))
          )}
        </View>
        <View style={styles.recordBtnContainer}>
          <TouchableOpacity onPress={() => router.push("/record")}>
            <Text style={styles.recordBtn}>Enregistrer</Text>
          </TouchableOpacity>
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
    fontWeight: "bold",
    textAlign: "center",
  },
  recordList: { flex: 1, gap: 4 },
  recordMessage: { fontSize: 16 },
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
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Home;
