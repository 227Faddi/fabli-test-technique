import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
