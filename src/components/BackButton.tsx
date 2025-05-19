import { router } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import icons from "../constants/icons";

const BackButton = () => {
  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
      {Platform.OS === "ios" ? icons.backIos : icons.backAndroid}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: "absolute",
    top: 5,
    left: 20,
  },
});

export default BackButton;
