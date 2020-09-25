import { baseParse, RootNode, AttributeNode, DirectiveNode, NodeTypes, ElementNode } from "@vue/compiler-dom"
import { generatorProps } from "./transforms"
import { transformElement } from "./transforms/transformElement"
import { transformInterpolation, transfromText } from "./transforms/transformText"


export interface generateOptions {
  prefix?: string
  onPrefix?: string
  replacements?: ReplacementsMap
}

export interface TplgenContext {
  prefix: string;
  onPrefix: string;
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

export type PropNode = AttributeNode | DirectiveNode
export type ReplacementName = 'ifReplacement' | 'forReplacement'
export type ReplacementHook = (prop: PropNode, context: TplgenContext) => void

export interface ReplacementsMap {
  ifReplacement?: ReplacementHook
  bindReplacement?: ReplacementHook
  forReplacement?: ReplacementHook
  attrReplacement?: ReplacementHook
  onReplacement?: ReplacementHook
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
    prefix = 'v-',
    onPrefix= 'bind',
    replacements = {}
  }: generateOptions): TplgenContext {
  const context = {
    prefix,
    onPrefix,
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

function traverseForTemplateChild(node: any, context: TplgenContext) {
  if (node.children.length) {
    node.children.forEach((child: any, index: number) => {
      const currentSize = index + 1
      traverseForTemplate(child, context)
      if (currentSize !== node.children.length) {
        context.newline()
      }
    })
  }
}

function traverseForTemplate(node: any, context: TplgenContext): string {
  if (!node) return context.tpl

  switch (node.type) {
    case NodeTypes.ROOT /* 根节点 */:
      traverseForTemplateChild(node, context)
      break;
    case NodeTypes.ELEMENT /* 元素标签 */:
      transformElement(node, context, traverseForTemplateChild)
      break;
    case NodeTypes.TEXT /* 文本标签 */:
      transfromText(node, context)
      break;
    case NodeTypes.INTERPOLATION /* 插值表达式 */:
      transformInterpolation(node.content, context)
      break;
  }
  return context.tpl
}

function generateTemplate(ast: RootNode, options: generateOptions): string {
  const context = createTemplateContext(ast, options)
  return traverseForTemplate(ast, context)
}

export function generate(template: string, options?: generateOptions) {
  const rootNode = baseParse(template)
  return generateTemplate(rootNode, options || {})
}