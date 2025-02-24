import { ElementNode, type LexicalNode, $createParagraphNode, type SerializedElementNode, type RangeSelection } from 'lexical'

type SerializedHeadingNode = SerializedElementNode & {
  type: 'heading';
  version: 1;
};

export class HeadingNode extends ElementNode {
  static getType(): string {
    return 'heading'
  }

  static clone(node: HeadingNode): HeadingNode {
    return new HeadingNode(node.__key)
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('h1')
    dom.className = 'PlaygroundEditorTheme__h1'
    return dom
  }

  updateDOM(): boolean {
    return false
  }

  insertNewAfter(_selection: RangeSelection, restoreSelection = true): LexicalNode | null {
    const newBlock = $createParagraphNode()
    const direction = this.getDirection()
    newBlock.setDirection(direction)
    this.insertAfter(newBlock, restoreSelection)
    return newBlock
  }

  exportJSON(): SerializedHeadingNode {
    return {
      ...super.exportJSON(),
      type: 'heading',
      version: 1,
    }
  }

  static importJSON(serializedNode: SerializedHeadingNode): HeadingNode {
    const node = $createHeadingNode()
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }
}

export function $createHeadingNode(): HeadingNode {
  return new HeadingNode()
}

export function $isHeadingNode(node: LexicalNode | null | undefined): node is HeadingNode {
  return node instanceof HeadingNode
}
