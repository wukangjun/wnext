import { flowRight } from 'lodash'

// export function parsesimpleExp(content: string) {
//   if (content) {
//     content = `"{{${content}}}"`
//   }
//   return content
// }

export const parsesimpleExp = flowRight(addDoubleQuotes, addCurlyBraces)

export function addDoubleQuotes(val: string) {
  return `"${val}"`
}

export function addCurlyBraces(val: string) {
  return `{{${val}}}`
}

export function createExpression(arg: string, exp: string) {
  return `${arg}="${exp}"`
}