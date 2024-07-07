import { DocumentNode } from '@apollo/client'
import { GraphQLError } from 'graphql'
import assignWith from 'lodash/assignWith'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import mergeWith from 'lodash/mergeWith'

// eslint-disable-next-line @typescript-eslint/ban-types
type DeepPartial<T> = T extends Function
  ? T
  : T extends Record<string, unknown>
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

const mergeVariables = <T>(
  defaultProps: T,
  otherProps: DeepPartial<T>,
  { assignChildObject = false }: CustomizerOptions = {}
): T => {
  return mergeWith({}, defaultProps, otherProps, customizer({ assignChildObject })) as T
}

const customizer =
  (options: CustomizerOptions = {}) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (objValue: any, srcValue: any) => {
    if (isArray(srcValue)) {
      return srcValue
    }
    if (options.assignChildObject && isObject(srcValue)) {
      return assignWith({}, objValue, srcValue, customizer())
    }
    if (srcValue === undefined) {
      return undefined
    }
  }

export function createMock<V, R extends { __typename?: string }>(
  query: DocumentNode,
  variables: V,
  data: Omit<R, '__typename'>,
  error?: GraphQLError
): CustomMockedResponse<V, R> {
  return {
    request: {
      query,
      variables,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newData: jest.fn<GraphqlNewData<R>, any>(() => ({
      data: {
        ...data,
        __typename: 'Query',
      },
      errors: error && [error],
    })),
  }
}

export function createOverridableMutationMock<V, R extends { __typename?: string }>(
  query: DocumentNode,
  defaultVariables: V,
  defaultData: Omit<R, '__typename'>
) {
  return function overrider(
    overrideVariables?: DeepPartial<V>,
    overrideData?: DeepPartial<Omit<R, '__typename'>>,
    { assignChildObject = false }: CustomizerOptions = {}
  ) {
    return createMutationMock<V, R>(
      query,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mergeVariables(defaultVariables, overrideVariables, { assignChildObject }),
      {
        ...defaultData,
        ...overrideData,
      }
    )
  }
}

export function createOverridableMock<V, R extends { __typename?: string }>(
  query: DocumentNode,
  defaultVariables: V,
  defaultData: Omit<R, '__typename'>
) {
  return function overrider(
    overrideVariables?: DeepPartial<V>,
    overrideData?: DeepPartial<Omit<R, '__typename'>>
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return createMock<V, R>(query, mergeVariables(defaultVariables, overrideVariables), {
      ...defaultData,
      ...overrideData,
    })
  }
}

export function createMutationMock<V, R extends { __typename?: string }>(
  query: DocumentNode,
  variables: V,
  data: Omit<R, '__typename'>,
  error?: GraphQLError
): CustomMutationMockedResponse<V, R> {
  return {
    request: {
      query,
      variables,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: jest.fn<GraphqlNewData<R>, any>(() => ({
      data: {
        ...data,
        __typename: 'Query',
      },
      errors: error && [error],
    })),
  }
}

export const createDefaultMocks = <IM>(initialMocks: () => IM) => {
  return function defaultMocks<OM extends { [K in keyof OM]: OM[K] }>(otherMocks?: OM) {
    return { ...initialMocks(), ...otherMocks }
  }
}

/***
 * @deprecated please use createOverridableMock
 */
export type CreateOverridableMock<
  V extends DeepPartial<unknown>,
  R extends { __typename?: unknown }
> = (overrideVariables?: DeepPartial<V>, overrideData?: R) => CustomMockedResponse<V, R>

export type CustomMockedResponse<V, R> = {
  request: { variables: V; query: DocumentNode }
  newData: jest.Mock<GraphqlNewData<R>>
}
export type CustomMutationMockedResponse<V, R> = {
  request: { variables: V; query: DocumentNode }
  result: jest.Mock<GraphqlNewData<R>>
}

type GraphqlNewData<R> = { data?: Omit<R, '__typename'>; errors?: GraphQLError[] }

type CustomizerOptions = {
  assignChildObject?: boolean
}
