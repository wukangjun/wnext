import { AttributeNode, DirectiveNode, ElementNode } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";

export function directiveTransform(prop: AttributeNode | DirectiveNode, context: TplgenContext) {
  const replacements = context.replacements || {}
  
  // 策略模式

}