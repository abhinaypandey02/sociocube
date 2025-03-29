export function normaliseDigits(val: number) {
  return Math.round(val * 10) / 10;
}

export function getER(followers: number, likes: number, comments: number) {
  if (followers === 0 || likes === 0) return 0;
  return normaliseDigits(
    ((likes + (comments === -1 ? likes / 40 : comments) * 2) / followers) * 100,
  );
}
export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const half = Math.floor(values.length / 2);
  const newValues = [...values].sort((a, b) => b - a);
  return newValues.length % 2
    ? newValues[half] || 0
    : ((newValues[half - 1] || 0) + (newValues[half] || 0)) / 2;
}
