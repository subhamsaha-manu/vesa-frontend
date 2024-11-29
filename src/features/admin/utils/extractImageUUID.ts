export function extractImageUUID(url: string): string {
  const regex = /images\/([a-f0-9-]+)\./
  const match = url.match(regex)!
  return match[1]
}
