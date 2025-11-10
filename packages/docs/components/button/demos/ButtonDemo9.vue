<template>
  <div class="demo">
    <p>测试图标显示：</p>
    <mx-button icon-type="edit">测试编辑</mx-button>
    <mx-button icon-type="view">测试查看</mx-button>
    <mx-button icon-type="add" type="primary">测试新增</mx-button>

    <p style="margin-top: 16px;">测试 props：</p>
    <p>iconType: {{ testProps.iconType }}</p>
    <p>hideIcon: {{ testProps.hideIcon }}</p>
    <p>loading: {{ testProps.loading }}</p>

    <mx-button :icon-type="testProps.iconType" :hide-icon="testProps.hideIcon" :loading="testProps.loading">
      动态测试
    </mx-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const testProps = ref({
  iconType: 'edit',
  hideIcon: false,
  loading: false
})
</script>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo p {
  margin: 0;
}
</style>

