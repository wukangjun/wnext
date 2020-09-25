import { AttributeNode } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";
import { createExpression } from "../utils";


export function attributeTransform(prop: AttributeNode, context: TplgenContext) {
  const replacements = context.replacements || {}
  
  if (replacements.attrReplacement) {
    replacements.attrReplacement.call(null, prop, context)
    return
  }
  if (prop.value) {
    createExpression(prop.name, prop.value.content)
  } else {
    context.push(`${prop.name}`)
  }
}