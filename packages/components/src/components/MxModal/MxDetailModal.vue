<!--
 * @Author: liaokt
 * @Description: 通用详情弹窗组件
 * @Date: 2025-11-13 17:00:00
 * @LastEditors: liaokt
 * @LastEditTime: 2025-11-14 14:34:58
-->
<template>
  <MxModal :modal="modal" :show-ok="showOk" :show-cancel="showCancel">
    <div :class="['mx-detail-modal', customClass]">
      <slot name="header" :data="detailData" />

      <template v-for="(group, groupIndex) in groupedItems" :key="groupIndex">
        <!-- 分组标题 -->
        <div v-if="group.title?.trim()" class="mx-detail-modal__group-title">
          <slot name="group-title" :title="group.title" :data="detailData">
            {{ group.title }}
          </slot>
        </div>

        <!-- 分组内容 -->
        <MxFormRow :cols="cols" :gutter="gutter" class="mx-detail-modal__grid">
          <div
            v-for="item in group.items"
            :key="item.key"
            class="mx-detail-modal__item"
            :class="{
              'mx-detail-modal__item--full': item.span === 24,
              'mx-detail-modal__item--empty': item.isPlaceholder
            }"
            :data-span="item.span"
          >
            <slot name="label" :item="item" :data="detailData">
              <div class="mx-detail-modal__label">{{ item.label }}</div>
            </slot>

            <div :class="['mx-detail-modal__value', item.valueClass]">
              <template v-if="$slots[`value-${item.key}`]">
                <slot :name="`value-${item.key}`" :item="item" :data="detailData" />
              </template>
              <template v-else-if="$slots.value">
                <slot name="value" :item="item" :data="detailData" />
              </template>
              <template v-else-if="item.component">
                <component :is="item.component" v-bind="item.componentProps" />
              </template>
              <template v-else-if="item.type === 'tag'">
                <a-tag v-if="!item.isPlaceholder" :color="item.tagColor || tagColor">
                  {{ item.display }}
                </a-tag>
                <span v-else>{{ placeholder }}</span>
              </template>
              <template v-else>
                {{ item.display }}
              </template>
            </div>
          </div>
        </MxFormRow>
      </template>
    </div>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" :data="detailData" />
    </template>
  </MxModal>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import { MxModal, useModal, type UseModalReturn } from '@/components/MxModal'
import { MxFormRow } from '@/components/MxFormLayout'

defineOptions({
  name: 'MxDetailModal'
})

type DetailValueType = 'default' | 'tag' | 'code' | 'block'

export interface DetailField {
  key: string
  label: string
  span?: number
  type?: DetailValueType
  suffix?: string
  formatter?: (value: unknown, data: Record<string, any>) => string
  tagColor?: string
  component?: Component
  componentProps?: Record<string, any>
}

export interface DetailGroup {
  title?: string
  fields: DetailField[]
}

export type DetailFieldOrGroup = DetailField | DetailGroup

interface NormalizedItem extends DetailField {
  display: string
  rawValue: unknown
  valueClass?: string
  isPlaceholder: boolean
}

interface Props {
  modal?: UseModalReturn
  /** 详情字段配置（支持嵌套分组） */
  fields: DetailFieldOrGroup[]
  /** 详情数据（不传则自动从 modal 参数中获取） */
  data?: Record<string, any>
  /** 列数 */
  cols?: number
  /** 间距 */
  gutter?: number | [number, number]
  /** 占位符 */
  placeholder?: string
  /** 默认标签颜色 */
  tagColor?: string
  /** 自定义根样式类 */
  customClass?: string
  /** 是否显示确认按钮 */
  showOk?: boolean
  /** 是否显示取消按钮 */
  showCancel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modal: undefined,
  fields: () => [] as DetailFieldOrGroup[],
  data: undefined,
  cols: 2,
  gutter: () => [32, 24] as [number, number],
  placeholder: '-',
  tagColor: 'blue',
  customClass: '',
  showOk: false,
  showCancel: false
})

const modal = props.modal || useModal()

const detailData = computed<Record<string, any>>(() => {
  if (props.data) {
    return props.data
  }
  const args = modal.args.value
  if (args.data && typeof args.data === 'object') {
    return args.data as Record<string, any>
  }
  return modal.getFormData()
})

const placeholder = computed(() => props.placeholder)
const tagColor = computed(() => props.tagColor)
const cols = computed(() => props.cols)
const gutter = computed(() => props.gutter)
const customClass = computed(() => props.customClass)
const showOk = computed(() => props.showOk)
const showCancel = computed(() => props.showCancel)

const valueClassMap: Record<DetailValueType, string | undefined> = {
  default: undefined,
  tag: 'mx-detail-modal__value--tag',
  code: 'mx-detail-modal__value--code',
  block: 'mx-detail-modal__value--block'
}

const hasValue = (value: unknown): boolean => {
  return !(value === null || value === undefined || value === '')
}

const formatValue = (field: DetailField, value: unknown): string => {
  if (field.formatter) {
    return field.formatter(value, detailData.value)
  }
  if (!hasValue(value)) {
    return placeholder.value
  }
  if (field.suffix) {
    return `${value}${field.suffix}`
  }
  return String(value)
}

// 判断是否为分组
const isGroup = (item: DetailFieldOrGroup): item is DetailGroup => {
  return 'fields' in item && Array.isArray((item as DetailGroup).fields)
}

// 规范化单个字段
const normalizeField = (field: DetailField): NormalizedItem => {
  const rawValue = detailData.value?.[field.key]
  const display = formatValue(field, rawValue)
  return {
    ...field,
    display,
    rawValue,
    isPlaceholder: display === placeholder.value,
    valueClass: field.type ? valueClassMap[field.type] : undefined,
    componentProps: {
      ...field.componentProps,
      value: rawValue,
      data: detailData.value,
      field
    }
  }
}

interface GroupedItem {
  title?: string
  items: NormalizedItem[]
}

const groupedItems = computed<GroupedItem[]>(() => {
  return props.fields.map(item => {
    if (isGroup(item)) {
      // 如果是分组，处理分组内的字段
      return {
        title: item.title,
        items: item.fields.map(normalizeField)
      }
    } else {
      // 如果是单个字段，转换为无标题分组
      return {
        items: [normalizeField(item)]
      }
    }
  })
})
</script>

<style scoped lang="scss">
.mx-detail-modal {
  min-width: 520px;

  &__group-title {
    position: relative;
    padding-left: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #0f2643;
    margin-bottom: 16px;
    margin-top: 24px;

    &:first-child {
      margin-top: 0;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 16px;
      background-color: #2f54eb;
      border-radius: 2px;
    }
  }

  &__grid {
    margin-bottom: 24px;

    :deep(.ant-row) {
      width: 100%;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &--full {
      width: 100%;
    }
  }

  &__label {
    color: #6f6f6f;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.6;
  }

  &__value {
    color: #1f1f1f;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.6;
    word-break: break-word;

    &--tag {
      display: inline-flex;
      align-items: center;

      :deep(.ant-tag) {
        margin-inline-end: 0;
        padding: 3px 12px;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 500;
        line-height: 22px;
      }
    }

    &--code {
      font-family: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
        monospace;
      font-size: 14px;
      letter-spacing: 0.6px;
      color: #3f3f3f;
    }

    &--block {
      display: inline-block;
      padding: 12px 16px;
      background: #fafafa;
      font-size: 14px;
      font-weight: 500;
      color: #3f3f3f;
      line-height: 1.7;
    }
  }
}
</style>
