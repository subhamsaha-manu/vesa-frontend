const storagePrefix = 'AUTH_TOKEN'

export const storage = {
  getItem: (storageKey?: string) => {
    return JSON.parse(window.sessionStorage.getItem(storageKey ?? storagePrefix) as string)
  },
  setItem: (storageKey: string, token: any) => {
    window.sessionStorage.setItem(storageKey ?? storagePrefix, JSON.stringify(token))
  },
  clearItem: (storageKey?: string) => {
    window.sessionStorage.removeItem(storageKey ?? storagePrefix)
  },
}
