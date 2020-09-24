import { ElementNode, NodeTypes } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";
import { directiveTransform } from "./directiveTransform";

export function generatorProps(node: ElementNode, context: TplgenContext) {
  if (node.props.length) {
    node.props.forEach(prop => {
      switch (prop.type) {
        case NodeTypes.DIRECTIVE /* 指令类型 */:
          directiveTransform(prop, context)
          break;
      }
    })
  }
}