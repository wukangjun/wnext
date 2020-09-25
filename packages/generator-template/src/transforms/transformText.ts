import { ExpressionNode, InterpolationNode, SimpleExpressionNode, TextNode } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";
import { addCurlyBraces } from "../utils";

export function transfromText(node: TextNode, context: TplgenContext) {
  context.push(`${node.content}`)
}

export function transformInterpolation(content: SimpleExpressionNode, context: TplgenContext) {
  context.push(`${addCurlyBraces(content.content)}`)
}