import { ElementNode, type LexicalNode, $createParagraphNode, type SerializedElementNode, type RangeSelection } from 'lexical'

type SerializedHighlightBlockNode = SerializedElementNode;

export class HighlightBlockNode extends ElementNode {
  static getType(): string {
    return 'highlight-block'
  }

  static clone(node: HighlightBlockNode): HighlightBlockNode {
    return new HighlightBlockNode(node.__key)
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('div')
    dom.className = 'editor-highlight-block'
    return dom
  }

  updateDOM(): boolean {
    return false
  }

  // Handle splitting on Enter key
  insertNewAfter(_selection: RangeSelection, restoreSelection = true): LexicalNode | null {
    const newBlock = $createParagraphNode()
    const direction = this.getDirection()
    newBlock.setDirection(direction)
    
    this.insertAfter(newBlock, restoreSelection)
    return newBlock
  }

  exportJSON(): SerializedHighlightBlockNode {
    return {
      ...super.exportJSON(),
      type: 'highlight-block',
      version: 1,
    }
  }

  static importJSON(serializedNode: SerializedHighlightBlockNode): HighlightBlockNode {
    const node = $createHighlightBlockNode()
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }
}

export function $createHighlightBlockNode(): HighlightBlockNode {
  return new HighlightBlockNode()
}

export function $isHighlightBlockNode(
  node: ElementNode | null | undefined
): node is HighlightBlockNode {
  return node instanceof HighlightBlockNode
}
