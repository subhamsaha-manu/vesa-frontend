import { AddQuestionInput, QuestionChoice } from '@/types'

export const parseCSV = (data: Array<Array<string>>): Array<AddQuestionInput> => {
  if (data) {
    data.shift()
    return data.map((ele) => {
      const choices: Array<QuestionChoice> = []
      for (let i = 1; i < ele.length - 1; i++) {
        const choice = {
          choiceTitle: ele[i].trim(),
          isCorrect: i === parseInt(ele[5]),
        }
        choices.push(choice)
      }

      return {
        questionTitle: ele[0].trim(),
        questionChoices: choices,
      }
    })
  }
  return []
}
