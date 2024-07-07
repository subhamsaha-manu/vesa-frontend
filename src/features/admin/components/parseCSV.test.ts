import { parseCSV } from './parseCSV'

test('parse csv test', () => {
  const data = [
    ['Question Title', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Option Index'],
    ['Water is?', ' Solid', 'Liquid', 'Gas', 'Plasma', '2'],
    ['Gold is?', ' Solid', 'Liquid', 'Gas', 'Plasma', '1'],
  ]

  const result = parseCSV(data)

  expect(result.length).toBe(2)
  expect(result[0].questionTitle).toBe('Water is?')
  expect(result[0].questionChoices[0].choiceTitle).toBe('Solid')
  expect(result[0].questionChoices[0].isCorrect).toBe(false)
  expect(result[0].questionChoices[1].isCorrect).toBe(true)
})
