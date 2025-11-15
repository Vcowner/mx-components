export interface MxButtonGroupProps {
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical'
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end'
  /** 是否拉伸到父容器宽度 */
  block?: boolean
  /** 按钮间距（像素） */
  gap?: number
}
