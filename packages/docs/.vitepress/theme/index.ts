import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import Demo from './components/Demo.vue'
// 直接从组件目录导入（从 .vitepress/theme/ 到 components/src/components/ 需要三级目录）
import MxButton from '../../../components/src/components/MxButton/MxButton.vue'
import MxInput from '../../../components/src/components/MxInput/MxInput.vue'
import MxDeleteButton from '../../../components/src/components/MxDeleteButton/MxDeleteButton.vue'
import MxImportButton from '../../../components/src/components/MxImportButton/MxImportButton.vue'
import MxSearchButton from '../../../components/src/components/MxSearchButton/MxSearchButton.vue'
import MxResetButton from '../../../components/src/components/MxResetButton/MxResetButton.vue'
import MxSubmitButton from '../../../components/src/components/MxSubmitButton/MxSubmitButton.vue'
import MxButtonGroup from '../../../components/src/components/MxButtonGroup/MxButtonGroup.vue'
import MxTableAction from '../../../components/src/components/MxTableAction/MxTableAction.vue'
import MxBatchAction from '../../../components/src/components/MxBatchAction/MxBatchAction.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 引入 Ant Design Vue
    app.use(Antd)
    
    // 注册 MX UI 组件
    app.component('MxButton', MxButton)
    app.component('MxInput', MxInput)
    app.component('MxDeleteButton', MxDeleteButton)
    app.component('MxImportButton', MxImportButton)
    app.component('MxSearchButton', MxSearchButton)
    app.component('MxResetButton', MxResetButton)
    app.component('MxSubmitButton', MxSubmitButton)
    app.component('MxButtonGroup', MxButtonGroup)
    app.component('MxTableAction', MxTableAction)
    app.component('MxBatchAction', MxBatchAction)
    
    // 注册全局 Demo 组件
    app.component('VDemo', Demo)
  }
} satisfies Theme
