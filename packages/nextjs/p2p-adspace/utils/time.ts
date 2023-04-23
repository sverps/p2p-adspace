export function formatDuration(duration: number) {
  return [
    `${duration % 60}s`,
    `${Math.floor(duration / 60) % 60}m`,
    `${Math.floor(duration / 3600) % 24}h`,
    `${Math.floor(duration / (3600 * 24))}d`,
  ]
    .reverse()
    .join(" ")
    .match(/^0\D[1-9]+[0-9]?\D$/);
}
