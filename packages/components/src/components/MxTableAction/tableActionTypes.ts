export interface TableActionItem {
  label: string
  key?: string
  disabled?: boolean
  slot?: string
  [key: string]: any
}

export interface MxTableActionProps {
  actions: TableActionItem[]
  spacing?: number
  size?: 'large' | 'middle' | 'small'
  maxCount?: number
}
