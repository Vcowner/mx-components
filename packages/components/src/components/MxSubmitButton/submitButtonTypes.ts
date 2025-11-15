export interface MxSubmitButtonProps {
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  size?: 'large' | 'middle' | 'small'
  disabled?: boolean
  loading?: boolean
  customClass?: string
  permission?: string | string[]
  debounce?: number
  hideIcon?: boolean
  submittingText?: string | ''
  defaultText?: string
}

export interface MxSubmitButtonEmits {
  submit: []
}
