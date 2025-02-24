import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { QuoteNode } from '@lexical/rich-text'
import { HighlightBlockNode } from './nodes/HighlightBlockNode'

import EditorTheme from './themes/default'
import { Toolbar } from './Toolbar'

import './styles/editor.css'

export function Editor() {
  const initialConfig = {
    namespace: 'MyEditor',
    onError: (error: Error) => {
      console.error(error)
    },
    theme: EditorTheme,
    nodes: [QuoteNode, HighlightBlockNode]
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor">
                <ContentEditable className="editor-input" />
              </div>
            </div>
          }
          placeholder={<div className="editor-placeholder">Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  )
}
