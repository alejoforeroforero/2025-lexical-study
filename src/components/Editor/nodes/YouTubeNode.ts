import { 
  ElementNode, 
  type LexicalNode, 
  $createParagraphNode, 
  type SerializedElementNode, 
  type RangeSelection, 
  NodeKey,
  $isNodeSelection,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  createCommand,
  type LexicalCommand
} from 'lexical'

type SerializedYouTubeNode = SerializedElementNode & {
  videoId: string;
  version: 1;
  type: 'youtube-video';
};

export const DELETE_YOUTUBE_COMMAND: LexicalCommand<void> = createCommand();

export class YouTubeNode extends ElementNode {
  __videoId: string;

  static getType(): string {
    return 'youtube-video'
  }

  static clone(node: YouTubeNode): YouTubeNode {
    return new YouTubeNode(node.__videoId, node.__key)
  }

  constructor(videoId: string, key?: NodeKey) {
    super(key);
    this.__videoId = videoId;
  }

  createDOM(): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.className = 'youtube-wrapper'
    
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${this.__videoId}`
    iframe.frameBorder = "0"
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen = true
    
    wrapper.appendChild(iframe)
    return wrapper
  }

  updateDOM(): boolean {
    return false
  }

  insertNewAfter(selection: RangeSelection | null, restoreSelection = true): LexicalNode | null {
    const newBlock = $createParagraphNode()
    const direction = this.getDirection()
    newBlock.setDirection(direction)
    
    this.insertAfter(newBlock, restoreSelection)
    return newBlock
  }

  collapseSelection(selection: RangeSelection | null): boolean {
    if (!$isNodeSelection(selection)) {
      return false;
    }
    
    const paragraph = $createParagraphNode();
    const previousNode = this.getPreviousSibling();
    
    if (previousNode === null) {
      this.insertBefore(paragraph);
      paragraph.select();
    } else {
      previousNode.selectEnd();
    }
    
    this.remove();
    return true;
  }

  static getCommand(): Record<string, () => boolean> {
    return {
      [`${KEY_DELETE_COMMAND}`]: () => {
        return true;
      },
      [`${KEY_BACKSPACE_COMMAND}`]: () => {
        return true;
      },
    };
  }

  exportJSON(): SerializedYouTubeNode {
    return {
      ...super.exportJSON(),
      type: 'youtube-video',
      videoId: this.__videoId,
      version: 1,
    }
  }

  static importJSON(serializedNode: SerializedYouTubeNode): YouTubeNode {
    const node = $createYouTubeNode(serializedNode.videoId)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  getVideoId(): string {
    return this.__videoId
  }
}

export function $createYouTubeNode(videoId: string): YouTubeNode {
  return new YouTubeNode(videoId)
}

export function $isYouTubeNode(
  node: LexicalNode | null | undefined
): node is YouTubeNode {
  return node instanceof YouTubeNode
}
