import { useTheme } from '../../../contexts/ThemeContext'
import { useToolbarState } from './hooks/useToolbarState'
import {
  ParagraphButton,
  H1Button,
  BoldButton,
  ItalicButton,
  QuoteButton,
  HighlightBlockButton,
  YouTubeButton
} from './buttons'

export function Toolbar() {
  const { theme } = useTheme()
  const toolbarState = useToolbarState()
  
  return (
    <div className={`
      border-b px-4 py-2 flex gap-2 items-center flex-wrap
      ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
    `}>
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
