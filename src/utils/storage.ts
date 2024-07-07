const storagePrefix = 'AUTH_TOKEN'

export const storage = {
  getToken: (storageKey?: string) => {
    return JSON.parse(window.sessionStorage.getItem(storageKey ?? storagePrefix) as string)
  },
  setToken: (storageKey: string, token: any) => {
    window.sessionStorage.setItem(storageKey ?? storagePrefix, JSON.stringify(token))
  },
  clearToken: (storageKey?: string) => {
    window.sessionStorage.removeItem(storageKey ?? storagePrefix)
  },
}
