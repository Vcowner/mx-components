import type { App } from 'vue'
import MxButton from './components/MxButton/MxButton.vue'
import MxDeleteButton from './components/MxDeleteButton/MxDeleteButton.vue'
import MxImportButton from './components/MxImportButton/MxImportButton.vue'
import MxSearchButton from './components/MxSearchButton/MxSearchButton.vue'
import MxResetButton from './components/MxResetButton/MxResetButton.vue'
import MxSubmitButton from './components/MxSubmitButton/MxSubmitButton.vue'
import MxButtonGroup from './components/MxButtonGroup/MxButtonGroup.vue'
import MxTableAction from './components/MxTableAction/MxTableAction.vue'
import MxBatchAction from './components/MxBatchAction/MxBatchAction.vue'

// 样式
import './style/index.css'

// 组件列表
const components = [
  { name: 'MxButton', component: MxButton },
  { name: 'MxDeleteButton', component: MxDeleteButton },
  { name: 'MxImportButton', component: MxImportButton },
  { name: 'MxSearchButton', component: MxSearchButton },
  { name: 'MxResetButton', component: MxResetButton },
  { name: 'MxSubmitButton', component: MxSubmitButton },
  { name: 'MxButtonGroup', component: MxButtonGroup },
  { name: 'MxTableAction', component: MxTableAction },
  { name: 'MxBatchAction', component: MxBatchAction }
]

// 组件安装函数
const install = (app: App) => {
  components.forEach(({ name, component }) => {
    app.component(name, component)
  })
}

// 默认导出
export default {
  install,
  MxButton,
  MxDeleteButton,
  MxImportButton,
  MxSearchButton,
  MxResetButton,
  MxSubmitButton,
  MxButtonGroup,
  MxTableAction,
  MxBatchAction
}

// 按需导出组件
export { MxButton, MxDeleteButton, MxImportButton, MxSearchButton, MxResetButton, MxSubmitButton, MxButtonGroup, MxTableAction, MxBatchAction }

// 为了兼容性，导出的别名
export const Button = MxButton
export const DeleteButton = MxDeleteButton
export const ImportButton = MxImportButton
export const SearchButton = MxSearchButton
export const ResetButton = MxResetButton
export const SubmitButton = MxSubmitButton
export const ButtonGroup = MxButtonGroup
export const TableAction = MxTableAction
export const BatchAction = MxBatchAction

// 导出组件类型，供 IDE 识别
export type { MxButtonProps, MxButtonEmits, IconType } from './components/MxButton/buttonTypes'
export type { MxDeleteButtonProps } from './components/MxDeleteButton/deleteButtonTypes'
export type { MxImportButtonProps } from './components/MxImportButton/importButtonTypes'
export type { MxSearchButtonProps, MxSearchButtonEmits } from './components/MxSearchButton/searchButtonTypes'
export type { MxResetButtonProps, MxResetButtonEmits } from './components/MxResetButton/resetButtonTypes'
export type { MxSubmitButtonProps } from './components/MxSubmitButton/submitButtonTypes'
export type { MxButtonGroupProps } from './components/MxButtonGroup/MxButtonGroup.vue'
export type { MxTableActionProps, TableActionItem } from './components/MxTableAction/MxTableAction.vue'
export type { BatchActionProps } from './components/MxBatchAction/MxBatchAction.vue'

