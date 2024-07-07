import { NetworkStatus } from '@apollo/client'

export function isLoading<T>(data: T, networkStatus: NetworkStatus) {
  return !data && [NetworkStatus.loading, NetworkStatus.setVariables].includes(networkStatus)
}
