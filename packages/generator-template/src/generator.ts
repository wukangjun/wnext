import { baseCompile, RootNode, AttributeNode, DirectiveNode, TemplateChildNode, BaseElementNode, NodeTypes, ElementNode } from "@vue/compiler-dom"
import { generatorProps } from "./transforms"
import { directiveTransform } from "./transforms/directiveTransform"


export interface generateOptions {
  replacements?: ReplacementsMap
}

export interface TplgenContext {
  replacements: ReplacementsMap
  source: string
  tpl: string
  column: number
  line: number
  offset: number
  push(code: string): void
  newline(): void
  repeat(n: number): void
}

export type ReplacementName = 'ifReplacement' | 'forReplacement'
export type ReplacementHook = (prop: AttributeNode | DirectiveNode, context: TplgenContext) => void

export enum PropsNameTypes {
  IF,
  FOR
}

export interface ReplacementsMap {
  ifReplacement?: ReplacementHook
}

function addPrefix(value: string) {
  return `<${value}>`
}

function addSuffix(value: string) {
  return `</${value}>`
}

function addBraces(exp: string) {
  return exp ? `{{${exp}}}`: ''
}

function createTemplateContext(
  ast: RootNode,
  {
    replacements = {}
  }: generateOptions): TplgenContext {
  const context = {
    replacements,
    source: ast.loc.source,
    tpl: '',
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    push(code: string) {
      context.tpl += code
    },
    newline() {
      newline(context.indentLevel)
    },
    repeat(n: number = 1) {
      context.push(` `.repeat(n))
    }
  }

  function newline(n: number) {
    context.push('\n' + ` `.repeat(n))
  }
  return context
}

function generateElement(node: ElementNode, context: TplgenContext) {
  context.push(`<${node.tag} `)
  generatorProps(node, context)
}

function traverseForTemplate(node: any, context: TplgenContext): string {
  if (!node) return context.tpl

  if (node.children && node.children.length) {
    node.children.forEach((child: any, index: number) => {
      const currentSize = index + 1
      traverseForTemplate(child, context)
      if (currentSize !== node.children.length) {
        context.newline()
      }
    })
  } else {
    switch (node.type) {
      case NodeTypes.ELEMENT /* 元素标签 */:
        generateElement(node, context)
        break;
      
    }
  }
  return context.tpl
}

function generateTemplate(ast: RootNode, options: generateOptions): string {
  const context = createTemplateContext(ast, options)
  return traverseForTemplate(ast, context)
}

export function generate(template: string, options?: generateOptions) {
  const { ast } = baseCompile(template)
  return generateTemplate(ast, options || {})
}