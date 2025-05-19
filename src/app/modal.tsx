import { StyleSheet, Text, View } from "react-native";

const Modal = () => {
  return (
    <View style={styles.container}>
      <Text>Recording Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Modal;
