/**
 * MxDeleteButton 组件属性
 */
export interface MxDeleteButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  /** 按钮尺寸 */
  size?: 'large' | 'middle' | 'small'
  /** 是否禁用 */
  disabled?: boolean
  /** 加载状态 */
  loading?: boolean
  /** 自定义类名 */
  customClass?: string
  /** 需要的权限，传入权限字符串或数组，有权限则显示按钮 */
  permission?: string | string[]
  /** 确认对话框文案 */
  confirm?: string
  /** 确认类型：modal（模态框）或 popconfirm（气泡确认） */
  confirmType?: 'modal' | 'popconfirm'
  /** 确认标题（仅 modal 类型） */
  confirmTitle?: string
  /** 确认按钮文案 */
  okText?: string
  /** 取消按钮文案 */
  cancelText?: string
  /** 是否隐藏图标 */
  hideIcon?: boolean
}
