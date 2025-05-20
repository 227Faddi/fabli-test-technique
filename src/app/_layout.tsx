import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import RecordContextProvider from "../contexts/RecordContextProvider";

const RootLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <RecordContextProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: "#FFFFFF",
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="record"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </RecordContextProvider>
    </SafeAreaView>
  );
};

export default RootLayout;
