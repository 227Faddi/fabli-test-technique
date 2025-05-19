import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RecordItem from "../components/RecordItem";

const Home = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mes enregistrements</Text>
        <View>
          <RecordItem name={"Audio-01"} duratiion={"00:20"} />
        </View>
        <View style={styles.recordBtnContainer}>
          <TouchableOpacity style={styles.recordBtn}>
            <Link href="/modal" style={styles.recordBtnText}>
              Enregistrer
            </Link>
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
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
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
  },
  recordBtnText: {
    color: "#000000",
    fontSize: 18,
  },
});

export default Home;
