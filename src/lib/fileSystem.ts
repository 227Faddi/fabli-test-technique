import * as FileSystem from "expo-file-system";

export const saveRecordingFile = async (uri: string, filename: string) => {
  const newPath = FileSystem.documentDirectory + filename;

  try {
    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });
    return newPath;
  } catch {
    console.error("Error moving file");
    return null;
  }
};

export const getSavedRecordings = async () => {
  try {
    const files = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory as string
    );
    const recordings = files
      .filter((file) => file.endsWith(".m4a"))
      .map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
      }));
    return recordings;
  } catch {
    console.error("Error reading recordings");
    return null;
  }
};
