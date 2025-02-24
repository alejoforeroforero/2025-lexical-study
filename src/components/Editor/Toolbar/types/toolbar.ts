export interface ToolbarState {
  isBold: boolean
  isItalic: boolean
  isQuote: boolean
  isHighlight: boolean
}

export interface ToolbarButtonProps {
  isActive: boolean
  onClick?: () => void
}
