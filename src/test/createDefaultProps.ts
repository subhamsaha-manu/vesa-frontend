import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'

// eslint-disable-next-line @typescript-eslint/ban-types
type DeepPartial<T> = T extends Function
  ? T
  : T extends Record<string, unknown>
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T
export const createDefaultProps = <T>(initialProps?: () => DeepPartial<T>) => {
  return function defaultProps(otherProps?: DeepPartial<T>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return buildProps<T>(initialProps(), otherProps)
  }
}

const buildProps = <T>(defaultProps: DeepPartial<T>, otherProps: DeepPartial<T>): T => {
  return mergeWith(defaultProps, otherProps, customizer) as T
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return srcValue
  }
}
