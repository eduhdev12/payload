import type { SerializedLexicalNode } from 'lexical'
import type { SelectType, TypeWithID } from 'payload'

import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode,
} from '../../../nodeTypes.js'
export type HTMLPopulateArguments = {
  collectionSlug: string
  id: number | string
  select?: SelectType
}

export type HTMLPopulateFn = <TData extends object = TypeWithID>(
  args: HTMLPopulateArguments,
) => Promise<TData | undefined>

export type HTMLConverter<T extends { [key: string]: any; type?: string } = SerializedLexicalNode> =

    | ((args: {
        childIndex: number
        converters: HTMLConverters
        node: T
        nodesToHTML: (args: {
          converters?: HTMLConverters
          disableIndent?: boolean | string[]
          disableTextAlign?: boolean | string[]
          nodes: SerializedLexicalNode[]
          parent?: SerializedLexicalNodeWithParent
        }) => Promise<string[]>
        parent: SerializedLexicalNodeWithParent
        populate?: HTMLPopulateFn
        providedCSSString: string
        providedStyleTag: string
      }) => Promise<string> | string)
    | string

export type ProvidedCSS = {
  'padding-inline-start'?: string
  'text-align'?: string
}

export type HTMLConverters<
  T extends { [key: string]: any; type?: string } =
    | DefaultNodeTypes
    | SerializedBlockNode<{ blockName?: null | string; blockType: string }> // need these to ensure types for blocks and inlineBlocks work if no generics are provided
    | SerializedInlineBlockNode<{ blockName?: null | string; blockType: string }>, // need these to ensure types for blocks and inlineBlocks work if no generics are provided
> = {
  [key: string]:
    | {
        [blockSlug: string]: HTMLConverter<any>
      }
    | HTMLConverter<any>
    | undefined
} & {
  [nodeType in Exclude<NonNullable<T['type']>, 'block' | 'inlineBlock'>]?: HTMLConverter<
    Extract<T, { type: nodeType }>
  >
} & {
  blocks?: {
    [K in Extract<
      Extract<T, { type: 'block' }> extends SerializedBlockNode<infer B>
        ? B extends { blockType: string }
          ? B['blockType']
          : never
        : never,
      string
    >]?: HTMLConverter<
      Extract<T, { type: 'block' }> extends SerializedBlockNode<infer B>
        ? SerializedBlockNode<Extract<B, { blockType: K }>>
        : SerializedBlockNode
    >
  }
  inlineBlocks?: {
    [K in Extract<
      Extract<T, { type: 'inlineBlock' }> extends SerializedInlineBlockNode<infer B>
        ? B extends { blockType: string }
          ? B['blockType']
          : never
        : never,
      string
    >]?: HTMLConverter<
      Extract<T, { type: 'inlineBlock' }> extends SerializedInlineBlockNode<infer B>
        ? SerializedInlineBlockNode<Extract<B, { blockType: K }>>
        : SerializedInlineBlockNode
    >
  }
}

export type HTMLConvertersFunction<
  T extends { [key: string]: any; type?: string } =
    | DefaultNodeTypes
    | SerializedBlockNode<{ blockName?: null | string }>
    | SerializedInlineBlockNode<{ blockName?: null | string; blockType: string }>,
> = (args: { defaultConverters: HTMLConverters<DefaultNodeTypes> }) => HTMLConverters<T>

export type SerializedLexicalNodeWithParent = {
  parent?: SerializedLexicalNode
} & SerializedLexicalNode
