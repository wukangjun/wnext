import { AttributeNode, DirectiveNode, ElementNode } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";
import { createVBindTemplate } from "./vBind";
import { createVIfTemplate } from "./vIf";
import { createVOnTemplate } from "./vOn";

export function directiveTransform(prop: DirectiveNode, context: TplgenContext) {
  const replacements = context.replacements || {}
  
  if (/^(if|else|else-if)$/.test(prop.name)) {
    if (replacements.ifReplacement) {
      replacements.ifReplacement.call(null, prop, context)
      return
    }
    createVIfTemplate(prop, context)
  } else if (/^bind$/.test(prop.name)) {
    if (replacements.bindReplacement) {
      replacements.bindReplacement.call(null, prop, context)
      return
    }
    createVBindTemplate(prop, context)
  } else if (/^for$/.test(prop.name)) {
    if (replacements.forReplacement) {
      replacements.forReplacement.call(null, prop, context)
      return
    }
    createVIfTemplate(prop, context)
  } else if (/^on$/.test(prop.name)) {
    if (replacements.onReplacement) {
      replacements.onReplacement.call(null, prop, context)
      return
    }
    createVOnTemplate(prop, context)
  }
}