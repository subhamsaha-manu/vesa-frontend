import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

/**
 * This hook gets called only when the dependencies change but not during initial render.
 *
 * @param {EffectCallback} effect The `useEffect` callback function.
 * @param {DependencyList} deps An array of dependencies.
 *
 * @example
 * ```
 *  useNonInitialEffect(()=>{
 *      alert("Dependency changed!");
 * },[dependency]);
 * ```
 */
export const useDidUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const initialRender = useRef(true)

  useEffect(() => {
    let effectReturns: void | (() => void | undefined) = () => undefined

    if (initialRender.current) {
      initialRender.current = false
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      effectReturns = effect()
    }

    if (effectReturns && typeof effectReturns === 'function') {
      return effectReturns
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
