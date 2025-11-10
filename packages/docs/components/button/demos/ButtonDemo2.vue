<template>
  <div class="demo">
    <div>
      <mx-button type="primary" size="large">Large</mx-button>
      <mx-button type="primary">Middle</mx-button>
      <mx-button type="primary" size="small">Small</mx-button>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo > div {
  display: flex;
  gap: 8px;
}
</style>

