import { ElementNode } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";
import { traverseProps } from "./traverseProps";

export function transformElement<N extends ElementNode, C extends TplgenContext>(
  node: N,
  context: C,
  traverse: (n: N, c: C) => void) {
  context.push(`<${node.tag} `)
  traverseProps(node, context)
  if (node.isSelfClosing) {
    context.push(`/>`)
  } else {
    context.push(`>`)
    context.newline()

    // 编译该元素的子节点
    if (traverse) {
      traverse(node, context)
    }
    context.push(`</${node.tag}>`)
  }
}