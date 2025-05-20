import { AudioModule } from "expo-audio";

export const getPermission = async () => {
  const { status } = await AudioModule.getRecordingPermissionsAsync();

  if (status === "granted") return true;

  if (status === "denied") {
    return false;
  }

  const { granted } = await AudioModule.requestRecordingPermissionsAsync();
  return granted;
};
