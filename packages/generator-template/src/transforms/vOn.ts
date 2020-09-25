import { DirectiveNode, SimpleExpressionNode } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";
import { addDoubleQuotes } from "../utils";

export function createVOnTemplate(prop: DirectiveNode, context: TplgenContext) {
  let expression = ''
  let arg = prop.arg as SimpleExpressionNode
  let exp = prop.exp as SimpleExpressionNode
  
  if (arg && arg.content) {
    const compat = arg.content === 'click' ? 'tap' : arg.content
    expression = `${context.onPrefix}${compat}`
  }
  if (exp && exp.content) {
    expression += `=${addDoubleQuotes(exp.content)}`
  }
  context.push(expression)
}