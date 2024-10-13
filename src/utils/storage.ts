export const storage = {
  getItem: (storageKey: string) => {
    return JSON.parse(window.sessionStorage.getItem(storageKey) as string)
  },
  setItem: (storageKey: string, value: any) => {
    window.sessionStorage.setItem(storageKey, JSON.stringify(value))
  },
  clearItem: (storageKey: string) => {
    window.sessionStorage.removeItem(storageKey)
  },
}
