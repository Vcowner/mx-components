<!--
 * @Author: liaokt
 * @Description: 表单行布局组件，用于控制表单项的排列，自动布局
 * @Date: 2025-11-13 12:30:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-13 12:30:00
-->
<template>
  <a-row :gutter="gutter" :class="rowClass">
    <template v-for="item in children" :key="item.key">
      <a-col :span="getSpan(item.node)">
        <component :is="item.node" />
      </a-col>
    </template>
  </a-row>
</template>

<script setup lang="ts">
import { computed, useSlots, VNode, Fragment, Comment } from 'vue'

defineOptions({
  name: 'MxFormRow'
})

interface Props {
  /** 每行显示的列数（1-24） */
  cols?: number
  /** 列间距 */
  gutter?: number | [number, number]
  /** 自定义类名 */
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: 1,
  gutter: 16,
  class: undefined
})

const slots = useSlots()

// 计算每列的 span
const colSpan = computed(() => Math.floor(24 / props.cols))

// 获取子节点列表（扁平化处理）
const children = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot) return []

  const result: Array<{ node: VNode; key: string | number | symbol }> = []
  let counter = 0

  const flattenNodes = (nodes: VNode[] | VNode) => {
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes]

    nodeArray.forEach((node: any) => {
      // 跳过文本节点和注释节点
      if (typeof node === 'string' || typeof node === 'number' || !node) {
        return
      }

      if (node.type === Comment) {
        return
      }

      // 如果是 Fragment，递归处理其子节点
      if (node.type === Fragment) {
        if (node.children && Array.isArray(node.children)) {
          flattenNodes(node.children as VNode[])
        }
      } else {
        // 普通节点，直接添加，并生成 key
        const key = node.key ?? `form-row-${counter++}`
        result.push({ node, key })
      }
    })
  }

  flattenNodes(defaultSlot)
  return result
})

// 获取节点的 span（支持通过 data-span 属性自定义）
const getSpan = (node: VNode): number => {
  if (node.props && typeof node.props === 'object') {
    // 支持 span 属性
    if ('span' in node.props) {
      const span = node.props.span
      return typeof span === 'number' ? span : Number(span) || colSpan.value
    }
    // 支持 data-span 属性
    if ('data-span' in node.props) {
      const span = node.props['data-span']
      return typeof span === 'number' ? span : Number(span) || colSpan.value
    }
  }
  return colSpan.value
}

// 计算行类名
const rowClass = computed(() => {
  return props.class
})
</script>
