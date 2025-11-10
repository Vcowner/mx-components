<template>
  <a-table :columns="columns" :data-source="data" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <mx-table-action 
          :actions="getActions(record)" 
          :max-count="2"
        />
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { EditOutlined, DeleteOutlined, EyeOutlined, CopyOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '操作',
    key: 'action',
    width: 120
  }
]

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '西湖区湖底公园2号'
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: '西湖区湖底公园3号'
  }
]

const getActions = (record) => {
  return [
    { 
      label: '编辑', 
      key: 'edit', 
      icon: EditOutlined,
      record,
      onClick: (action) => {
        message.success(`编辑 ${action.record.name}`)
      }
    },
    { 
      label: '删除', 
      key: 'delete', 
      icon: DeleteOutlined,
      record,
      onClick: (action) => {
        message.success(`删除 ${action.record.name}`)
      }
    },
    { 
      label: '查看', 
      key: 'view', 
      icon: EyeOutlined,
      record,
      onClick: (action) => {
        message.success(`查看 ${action.record.name}`)
      }
    },
    { 
      label: '复制', 
      key: 'copy', 
      icon: CopyOutlined,
      record,
      onClick: (action) => {
        message.success(`复制 ${action.record.name}`)
      }
    }
  ]
}

const handleAction = (action) => {
  console.log('操作:', action)
}
</script>

