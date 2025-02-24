import { $createQuoteNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection, $createParagraphNode } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import type { ToolbarButtonProps } from '../types/toolbar'

export function QuoteButton({ isActive }: ToolbarButtonProps) {
  const [editor] = useLexicalComposerContext()

  const handleClick = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => 
          isActive ? $createParagraphNode() : $createQuoteNode()
        )
      }
    })
  }, [editor, isActive])

  return (
    <button 
      onClick={handleClick}
      className={`
        px-3 py-1.5 rounded text-sm font-medium transition-colors
        ${isActive 
          ? 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800
      `}
      aria-label="Format as blockquote"
      aria-pressed={isActive}
    >
      "
    </button>
  )
}
