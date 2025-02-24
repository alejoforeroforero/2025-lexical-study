import { $getSelection, $isRangeSelection, $createParagraphNode } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import { $createYouTubeNode } from '../../nodes/YouTubeNode'
import { Modal } from '../../../shared/Modal'
import { YouTubeModal } from '../../modals/YouTubeModal'
import { useModal } from '../../../../hooks/useModal'

export function YouTubeButton() {
  const [editor] = useLexicalComposerContext()
  const { isOpen, openModal, closeModal } = useModal()

  const insertYouTube = useCallback((videoId: string) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const youtubeNode = $createYouTubeNode(videoId)
        const paragraphNode = $createParagraphNode()
        selection.insertNodes([youtubeNode, paragraphNode])
        paragraphNode.select()
      }
    })
  }, [editor])

  return (
    <>
      <button 
        onClick={openModal}
        className={`
          px-3 py-1.5 rounded text-sm font-medium transition-colors
          bg-gray-100 hover:bg-gray-200 text-gray-700 
          dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
          dark:focus:ring-offset-gray-800
        `}
        aria-label="Insert YouTube video"
      >
        YT
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Insert YouTube Video"
      >
        <YouTubeModal 
          onSubmit={insertYouTube}
          onClose={closeModal}
        />
      </Modal>
    </>
  )
}
