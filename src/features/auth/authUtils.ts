export const logoutFn = async () => {
  window.sessionStorage.clear()
  window.location.assign(window.location.origin as unknown as string)
}
