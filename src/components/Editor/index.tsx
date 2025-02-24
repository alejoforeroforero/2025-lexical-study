import { LexicalComposer, InitialConfigType } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { QuoteNode } from '@lexical/rich-text'
import { HighlightBlockNode } from './nodes/HighlightBlockNode'
import { YouTubeNode } from './nodes/YouTubeNode'
import { HeadingNode } from './nodes/HeadingNode'
import { YouTubePlugin } from './plugins/YouTubePlugin'
import { $createParagraphNode, $getRoot } from 'lexical'
import { useTheme } from '../../contexts/ThemeContext'

import EditorTheme from './themes/default'
import { Toolbar } from './Toolbar'
import './styles/editor-custom.css'

export function Editor() {
  const { theme: appTheme } = useTheme()

  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    onError: (error: Error) => {
      console.error(error)
    },
    theme: EditorTheme,
    nodes: [
      QuoteNode,
      HeadingNode,
      HighlightBlockNode,
      {
        replace: YouTubeNode,
        with: (node: YouTubeNode) => new YouTubeNode(node.getVideoId())
      }
    ],
    editorState: () => {
      const root = $getRoot();
      if (root.getFirstChild() === null) {
        const paragraph = $createParagraphNode();
        root.append(paragraph);
      }
    }
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={`
        rounded-lg overflow-hidden shadow-lg
        ${appTheme === 'dark' 
          ? 'bg-[#2A2A2A] border-[#404040]' 
          : 'bg-[#EEF2F6] border-[#E4E9F0]'}  /* Softer editor background */
        border
      `}>
        <Toolbar />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className={`
                  min-h-[150px] p-4
                  ${appTheme === 'dark' 
                    ? 'text-gray-100' 
                    : 'bg-[#F4F7FA] text-[#2C3E50]'}  /* Softer content area */
                `}>
                  <ContentEditable className="outline-none" />
                </div>
              </div>
            }
            placeholder={
              <div className={`
                absolute top-[1.125rem] left-4 pointer-events-none select-none
                ${appTheme === 'dark' ? 'text-[#666666]' : 'text-[#94A3B8]'}
              `}>
                Enter some text...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <YouTubePlugin />
      </div>
    </LexicalComposer>
  )
}
