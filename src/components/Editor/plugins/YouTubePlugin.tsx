import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { 
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  $getSelection,
  $isNodeSelection,
  $createParagraphNode,
  $getRoot
} from 'lexical';
import { $isYouTubeNode } from '../nodes/YouTubeNode';

export function YouTubePlugin(): null {
  const [editor] = useLexicalComposerContext();

  const handleDelete = () => {
    return (event: KeyboardEvent) => {
      const selection = $getSelection();
      if (!$isNodeSelection(selection)) {
        return false;
      }
      const nodes = selection.getNodes();
      const node = nodes[0];
      if (!$isYouTubeNode(node)) {
        return false;
      }
      
      editor.update(() => {
        const paragraph = $createParagraphNode();
        const root = $getRoot();
        
        // Remove the node first to ensure the wrapper is cleaned up
        node.remove();
        
        // Then add the new paragraph
        const firstChild = root.getFirstChild();
        if (firstChild) {
          firstChild.insertBefore(paragraph);
        } else {
          root.append(paragraph);
        }
        
        paragraph.select(0);
      });
      
      event.preventDefault();
      return true;
    };
  };

  useEffect(() => {
    return editor.registerCommand(
      KEY_DELETE_COMMAND,
      handleDelete(),
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      handleDelete(),
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}
