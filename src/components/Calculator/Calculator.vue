<template>
  <div class="calculator">
    <h1>Calculadora de investimentos</h1>
    <Form />
  </div>
</template>

<script setup lang="ts">
  import Form from '@/components/Form/Form.vue'
</script>

<style scoped lang="scss">
  .calculator {
    width: 100%;
    max-width: 840px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
