import { useCallback, useState, useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, $isElementNode, SELECTION_CHANGE_COMMAND } from 'lexical'
import { $isQuoteNode } from '@lexical/rich-text'
import { $isHighlightBlockNode } from '../../nodes/HighlightBlockNode'
import type { ToolbarState } from '../types/toolbar'

export function useToolbarState() {
  const [editor] = useLexicalComposerContext()
  const [toolbarState, setToolbarState] = useState<ToolbarState>({
    isBold: false,
    isItalic: false,
    isQuote: false,
    isHighlight: false
  })

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if (!selection || !$isRangeSelection(selection)) {
      setToolbarState(prevState => ({
        ...prevState,
        isBold: false,
        isItalic: false,
        isQuote: false,
        isHighlight: false
      }))
      return
    }

    const anchorNode = selection.anchor.getNode()
    const element = anchorNode.getKey() === 'root' 
      ? anchorNode 
      : anchorNode.getTopLevelElement()

    setToolbarState(prevState => ({
      ...prevState,
      isBold: selection.hasFormat('bold'),
      isItalic: selection.hasFormat('italic'),
      isQuote: element ? $isQuoteNode(element) : false,
      isHighlight: element && $isElementNode(element) ? $isHighlightBlockNode(element) : false
    }))
  }, [])

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar()
      })
    })
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar()
        return false
      },
      1
    )
  }, [editor, updateToolbar])

  return toolbarState
}
