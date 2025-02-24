import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection, $createParagraphNode } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import type { ToolbarButtonProps } from '../types/toolbar'
import { $createHighlightBlockNode } from '../../nodes/HighlightBlockNode'

export function HighlightBlockButton({ isActive }: ToolbarButtonProps) {
  const [editor] = useLexicalComposerContext()

  const handleClick = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => 
          isActive ? $createParagraphNode() : $createHighlightBlockNode()
        )
      }
    })
  }, [editor, isActive])

  return (
    <button 
      onClick={handleClick}
      className={`toolbar-button ${isActive ? 'active' : ''}`}
      aria-pressed={isActive}
    >
      H
    </button>
  )
}
