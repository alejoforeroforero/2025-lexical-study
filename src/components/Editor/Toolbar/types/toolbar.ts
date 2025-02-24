export interface ToolbarState {
  isBold: boolean
  isItalic: boolean
  isQuote: boolean
  isHighlight: boolean
  isParagraph: boolean
  isH1: boolean
}

export interface ToolbarButtonProps {
  isActive: boolean
  onClick?: () => void
}
