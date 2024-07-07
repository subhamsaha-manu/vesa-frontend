export function getInitials(name: string) {
  const space = /\s+/
  return name
    .trim()
    .split(space)
    .map((item) => item[0])
    .reduce((acc, item) => acc + item, '')
    .toUpperCase()
}
