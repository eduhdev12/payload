import type { SerializedHeadingNode } from '../../../../nodeTypes.js'
import type { HTMLConverters } from '../types.js'

export const HeadingHTMLConverter: HTMLConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToHTML }) => {
    const children = nodesToHTML({
      nodes: node.children,
    }).join('')

    return `<${node.tag}>${children}</${node.tag}>`
  },
}
