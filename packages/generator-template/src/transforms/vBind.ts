import { DirectiveNode, SimpleExpressionNode } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";
import { parsesimpleExp } from "../utils";

/**
 * @example:
 * :a="c" -> a="{{c}}"
 * :a="c+b" -> a="{{c+b}}"
 * :a="'c' + b" -> a="{{'c' + b}}"
 * a="c"  -> a="c"
 * 
 * @param prop 
 * @param context 
 */
export function createVBindTemplate(prop: DirectiveNode, context: TplgenContext) {
  let expression = ''
  let arg = prop.arg as SimpleExpressionNode
  let exp = prop.exp as SimpleExpressionNode
  
  if (arg && arg.content) {
    expression = `${arg.content}`
  }
  if (exp && exp.content) {
    expression += `=${parsesimpleExp(exp.content)}`
  }
  context.push(expression)
}