<template>
  <div class="calculator">
    <div class="calculator__header">
      <h1>Calculadora de investimentos</h1>
    </div>

    <div class="calculator__body">
      <Form />
      <Button>CALCULAR</Button>
    </div>

    <Divider />

    <div class="calculator__footer">
      <div class="phrase">
        <p class="phrase__text">“Quanto mais você tiver, mais você terá”</p>
        <span class="phrase__author">- por aí, Alguém</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Button from '@/components/Button/Button.vue'
  import Divider from '@/components/Divider/Divider.vue'
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
    gap: $g-24;

    &__body {
      display: flex;
      flex-direction: column;
      gap: $g-24;
    }

    .phrase {
      display: flex;
      flex-direction: column;
      align-items: end;
    }
  }
</style>
