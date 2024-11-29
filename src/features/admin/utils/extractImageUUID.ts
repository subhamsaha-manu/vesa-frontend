export function extractImageUUID(url: string): string {
  const regex = /images\/([a-f0-9-]+)\./
  const match = url.match(regex)!
  return match[1]
}

export const extractFileType = (url: string): string => {
  const regex = /\.([a-zA-Z0-9]+)(?:\?|$)/
  const match = url.match(regex)!
  return match[1]
}
