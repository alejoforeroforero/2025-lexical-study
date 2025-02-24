import { $getSelection, $isRangeSelection, $createParagraphNode } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import { $createYouTubeNode } from '../../nodes/YouTubeNode'

export function YouTubeButton() {
  const [editor] = useLexicalComposerContext()

  const handleClick = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const videoId = 'c3_R-RSPmYY'  // Changed video ID
        const youtubeNode = $createYouTubeNode(videoId)
        selection.insertNodes([youtubeNode])
        
        // Create and insert a new paragraph node after the YouTube node
        const paragraphNode = $createParagraphNode()
        youtubeNode.insertAfter(paragraphNode)
        
        // Select the new paragraph node
        paragraphNode.select()
      }
    })
  }, [editor])

  return (
    <button 
      onClick={handleClick}
      className="toolbar-button"
      aria-label="Insert YouTube video"
    >
      YT
    </button>
  )
}
