import { DirectiveNode, SimpleExpressionNode } from "@vue/compiler-dom"
import { TplgenContext } from "../generator"
import { parsesimpleExp } from "../utils"

export function createVForTemplate(prop: DirectiveNode, context: TplgenContext) {
  let exp = prop.exp as SimpleExpressionNode
  if (exp.content) {
    // wx:for
    const prefixname = `${context.prefix}${prop.name}` 
    const [arg, expression]: Array<string> = exp.content.split(/\s+in\s+/)
    // [item, index]
    const matchArgs = arg.match(/\(?(\w+),?\s*(\w+)?\)?/)
    if (expression) {
      context.push(`${prefixname}=${parsesimpleExp(expression)} `)
    }
    if (matchArgs) {
      if (matchArgs[1]) {
        context.push(`${prefixname}-item="${matchArgs[1]}"`)
      }
      context.push(`${prefixname}-index="${matchArgs[2] || 'index'}"`)
    }
  }
}