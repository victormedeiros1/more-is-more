<template>
  <div class="calculadora">
    <div class="header">
      <h1 class="header__title">Qual sua meta de investimento?</h1>
    </div>

    <div class="body">
      <Form />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
  import Form from '@/components/Calculadora/Form/Form.vue'
</script>

<style scoped lang="scss">
  .calculadora {
    display: flex;
    flex-direction: column;
    gap: $g-16;
    width: 100%;
    height: 300px;
    background-color: $gray-50;
    border-radius: 0.5rem;
    border: 1px solid $gray-200;
    padding: $p-24;
  }
</style>
