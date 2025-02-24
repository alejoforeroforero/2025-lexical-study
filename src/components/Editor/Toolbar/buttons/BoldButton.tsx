import { FORMAT_TEXT_COMMAND } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import type { ToolbarButtonProps } from '../types/toolbar'

export function BoldButton({ isActive }: ToolbarButtonProps) {
  const [editor] = useLexicalComposerContext()

  const handleClick = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }, [editor])

  return (
    <button 
      onClick={handleClick}
      className={`toolbar-button ${isActive ? 'active' : ''}`}
      aria-pressed={isActive}
    >
      B
    </button>
  )
}