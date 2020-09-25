import { ElementNode, NodeTypes } from "@vue/compiler-dom";
import { TplgenContext } from "../generator";
import { attributeTransform } from "./attributeTransform";
import { directiveTransform } from "./directiveTransform";

export function generatorProps(node: ElementNode, context: TplgenContext) {
  if (node.props.length) {
    node.props.forEach(prop => {
      switch (prop.type) {
        case NodeTypes.DIRECTIVE /* 指令类型 */:
          directiveTransform(prop, context)
          break;
        case NodeTypes.ATTRIBUTE /* 属性类型 */:
          attributeTransform(prop, context)
          break;
      }
    })
  }
}