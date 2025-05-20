export const generateFileName = (duration: number) => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = now.getFullYear().toString().slice(-2);
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${year}-${month}-${day}-${hours}${minutes}${seconds}.${duration}.m4a`;
};

export function formatDuration(filename: string) {
  const match = filename.match(/\.(\d+)\.m4a$/);
  if (!match) return "00:00";

  const milliseconds = parseInt(match[1], 10);
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}`;
}

export const formatTime = (totalSeconds: number) => {
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(mins)}:${pad(secs)}`;
};
