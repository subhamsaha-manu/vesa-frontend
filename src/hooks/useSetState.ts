import { useState } from 'react'

export function useSetState<Obj>(initialState: {
  [key: string]: any
}): [Obj, (state: { [key: string]: any }) => void] {
  const [state, regularSetState] = useState(initialState)

  const setState = (newState: Record<string, unknown>) => {
    regularSetState((prevState) => ({
      ...prevState,
      ...newState,
    }))
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [state, setState]
}
