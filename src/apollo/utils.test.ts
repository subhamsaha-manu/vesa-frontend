import { formatProductionURL } from './utils'

test('dummy test', () => {
  const result = formatProductionURL('test')
  expect(result).not.toBeNull()
})
