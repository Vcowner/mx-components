<template>
  <div ref="tableContainerRef" class="configurable-table">
    <!-- 搜索和操作工具栏 -->
    <MxTableToolbar
      v-if="hasToolbar"
      :search-list="searchList"
      :operate-list="operateList || []"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- 表格主体 -->
    <a-table
      :columns="processedColumns"
      :data-source="dataSource"
      :pagination="paginationConfig"
      :row-key="rowKey || 'id'"
      :loading="loading"
      :bordered="bordered"
      :size="size || 'middle'"
      :row-selection="selectionConfig"
      :scroll="mergedScroll"
      v-bind="$attrs"
      @change="handleTableChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref, toRefs } from 'vue'
import type { TableConfig } from './table'
import { formatDate, formatTime } from '@/utils/time/time'
import { getStatusConfigByValue } from '@/constants/status'
import MxTableToolbar from '@/components/MxTableToolbar/MxTableToolbar.vue'
import { Badge, Tag, Tooltip } from 'ant-design-vue'
import { useSize } from '@/hooks'

interface Props extends TableConfig {}

const props = defineProps<Props>()

// 解构 props 保持响应式
const {
  columns,
  dataSource,
  pagination,
  rowKey,
  loading,
  bordered,
  size,
  searchList,
  operateList,
  scroll
} = toRefs(props)

// 表格容器引用
const tableContainerRef = ref<HTMLElement | null>(null)

// 监听容器尺寸变化
const containerSize = useSize(
  computed(() => tableContainerRef.value),
  {
    immediate: true,
    listenWindowResize: false
  }
)

// 计算表格滚动高度（容器高度 - 工具栏高度 - 分页高度 - 缓冲）
const hasToolbar = computed(() => {
  const searchCount = searchList.value?.length ?? 0
  const operateCount = operateList.value?.length ?? 0
  return searchCount > 0 || operateCount > 0
})

const calculatedScrollHeight = computed(() => {
  const baseHeight = containerSize.value.height
  if (baseHeight === 0) return undefined // 如果容器高度为0，不设置滚动高度

  // 如果数据量很少（少于等于分页大小），不需要滚动
  const dataLength = dataSource.value?.length || 0
  const pageSize = pagination.value?.pageSize || 10
  if (dataLength <= pageSize && dataLength <= 5) {
    return undefined // 数据量少时不设置滚动高度
  }

  const toolbarHeight = hasToolbar.value ? 80 : 0 // 工具栏高度
  const paginationHeight = pagination.value ? 60 : 0 // 分页高度
  const buffer = 80 // 缓冲空间

  const calculatedHeight = baseHeight - toolbarHeight - paginationHeight - buffer
  // 只有当计算出的高度大于最小高度时才设置滚动
  if (calculatedHeight > 300) {
    return calculatedHeight
  }
  return undefined
})

// 合并滚动配置：如果外部传入了 scroll，则合并；否则使用计算的高度
const mergedScroll = computed(() => {
  if (scroll.value) {
    // 如果外部传入了 scroll，合并 y 轴高度（优先使用计算的高度）
    return {
      ...scroll.value,
      y: calculatedScrollHeight.value || scroll.value.y
    }
  }
  // 如果没有传入 scroll，使用计算的高度
  if (calculatedScrollHeight.value) {
    return {
      y: calculatedScrollHeight.value
    }
  }
  return undefined
})

// 获取选择配置
const selection = computed(() => props.rowSelection)

// 定义事件
const emit = defineEmits<{
  paginationChange: [pagination: { current: number; pageSize: number }]
  selectionChange: [selectedRowKeys: string[], selectedRows: any[]]
  search: [params: Record<string, any>, reset?: boolean]
  reset: [params: any]
}>()

// 通用文本渲染函数（带 Tooltip 和省略号）
const renderTextWithTooltip = (text: string, maxLength: number = 20) => {
  if (!text) return h('span', '-')

  if (text.length > maxLength) {
    return h(
      Tooltip,
      {
        title: text,
        placement: 'topLeft'
      },
      {
        default: () =>
          h(
            'span',
            {
              style: {
                display: 'inline-block',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }
            },
            text
          )
      }
    )
  }

  return h('span', text)
}

// 列值渲染函数
const renderColumnValue = (type: string, text: string, options?: any[], column?: any) => {
  switch (type) {
    case 'text':
      return renderTextWithTooltip(text)

    case 'tag':
      return text
        ? h(Tag, { color: column?.color || 'default' }, { default: () => text })
        : h('span', '-')

    case 'status': {
      const statusConfig = getStatusConfigByValue(Number.parseInt(text))
      const status = options?.find((opt: any) => opt.value === text)
      return h(Badge, {
        color: statusConfig.color,
        text: status?.label || '-'
      })
    }

    case 'date':
      return h('span', formatDate(text))

    case 'dateTime':
      return h('span', formatTime(text))

    case 'select': {
      const option = options?.find((opt: any) => opt.value === text)
      const displayText = option?.label || '-'
      return renderTextWithTooltip(displayText)
    }

    default:
      return renderTextWithTooltip(text)
  }
}

// 列配置处理
const processedColumns = computed(() => {
  return columns.value.map((column: any) => {
    // 提取自定义属性，保留所有 Ant Design Vue 原生属性（包括 width）
    const { type, options, color, customRender, ...columnConfig } = column

    // 处理自定义渲染
    if (type && !['custom'].includes(type)) {
      // 如果已经有自定义渲染函数，优先使用
      if (customRender) {
        columnConfig.customRender = customRender
      } else {
        // 否则使用类型渲染
        columnConfig.customRender = ({ text }: { text: any }) =>
          renderColumnValue(type, text, options, { ...column, color })
      }
    } else if (type === 'custom' && customRender) {
      // 自定义类型使用用户提供的渲染函数
      columnConfig.customRender = customRender
    }

    // 确保所有列属性都被保留（包括 width, fixed, align, sorter 等）
    return columnConfig
  })
})

// 分页配置
const paginationConfig = computed(() => {
  if (!pagination.value) return false

  const {
    current,
    pageSize,
    total,
    showSizeChanger = true,
    showQuickJumper = false
  } = pagination.value

  return {
    current,
    pageSize,
    total,
    showSizeChanger,
    showQuickJumper,
    showTotal: (total: number) => `共 ${total} 条`
  }
})

// 内部选中状态
const internalSelectedRowKeys = ref<string[]>(
  (selection.value?.selectedRowKeys || []).map(key => String(key))
)

// 选择配置
const selectionConfig = computed(() => {
  if (!selection.value) return undefined

  return {
    ...selection.value,
    selectedRowKeys: internalSelectedRowKeys.value,
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      internalSelectedRowKeys.value = selectedRowKeys.map(key => String(key))
      emit('selectionChange', selectedRowKeys, selectedRows)
      selection.value?.onChange?.(selectedRowKeys, selectedRows)
    }
  }
})

// 事件处理函数
const handleTableChange = (pagination: any, filters: any, sorter: any, extra?: any) => {
  props.onChange?.(pagination, filters, sorter, extra)

  if (pagination) {
    emit('paginationChange', {
      current: pagination.current,
      pageSize: pagination.pageSize
    })
  }
}

const handleSearch = (params: Record<string, any>, reset?: boolean) => {
  emit('search', params, reset)
}

const handleReset = (params: any) => {
  emit('reset', params)
}
</script>

<style scoped>
.configurable-table {
  width: 100%;
}

.table-title {
  margin-bottom: 16px;
}

.table-title h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}
</style>
