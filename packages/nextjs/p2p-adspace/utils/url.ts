export function addProtocolIfMissing(url: string) {
  if (url.includes("://")) {
    return url;
  }
  return `https://${url}`;
}
