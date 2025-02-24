import { useToolbarState } from './hooks/useToolbarState'
import { 
  ParagraphButton, 
  H1Button,
  BoldButton, 
  ItalicButton, 
  QuoteButton, 
  HighlightBlockButton, 
  YouTubeButton 
} from './buttons/index'

export function Toolbar() {
  const toolbarState = useToolbarState()

  return (
    <div className="toolbar">
      <ParagraphButton isActive={toolbarState.isParagraph} />
      <H1Button isActive={toolbarState.isH1} />
      <BoldButton isActive={toolbarState.isBold} />
      <ItalicButton isActive={toolbarState.isItalic} />
      <QuoteButton isActive={toolbarState.isQuote} />
      <HighlightBlockButton isActive={toolbarState.isHighlight} />
      <YouTubeButton />
    </div>
  )
}
