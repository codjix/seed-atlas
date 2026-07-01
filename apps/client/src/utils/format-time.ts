export const formatTime = (ms: number) => {
  if (ms >= 1000 * 60) return `${(ms / 1000 / 60).toFixed(2)}m`;
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`;
  return `${ms.toFixed(0)}ms`;
};
