import { DirectiveNode, SimpleExpressionNode } from "@vue/compiler-dom";
import { PropNode, TplgenContext } from "../generator";
import { parsesimpleExp } from "../utils";

export function createVIfTemplate(prop: DirectiveNode, context: TplgenContext) {
  let expression = ''
  expression += `${context.prefix}${prop.name}`
  if (prop.exp) {
    const { content } = (prop.exp as SimpleExpressionNode)
    expression += `=${parsesimpleExp(content)} `
  }
  context.push(expression)
}