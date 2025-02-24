import { useToolbarState } from './hooks/useToolbarState'
import { BoldButton, ItalicButton, QuoteButton, HighlightBlockButton } from './buttons/index'

export function Toolbar() {
  const toolbarState = useToolbarState()

  return (
    <div className="toolbar">
      <BoldButton isActive={toolbarState.isBold} />
      <ItalicButton isActive={toolbarState.isItalic} />
      <QuoteButton isActive={toolbarState.isQuote} />
      <HighlightBlockButton isActive={toolbarState.isHighlight} />
    </div>
  )
}
