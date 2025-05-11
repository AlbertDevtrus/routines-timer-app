export default function formatTime (seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${
    remainingSeconds.toString().length === 1
      ? `0${remainingSeconds.toString()}`
      : remainingSeconds
  }`;
};
