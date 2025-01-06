<template>
  <div class="calculator">
    <div class="calculator__header">
      <img src="@/assets/images/logo.svg" />
      <h1 class="calculator__title">Calculadora de investimentos</h1>
      <h2 class="calculator__subtitle">{{ message }}</h2>
    </div>

    <div class="calculator__body">
      <Form v-model:message="message" />
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
  import { ref } from 'vue'

  import Divider from '@/components/Divider/Divider.vue'
  import Form from '@/components/Form/Form.vue'

  const message = ref<string>(
    'Trave o campo que deseja descobrir o valor e insira os outros valores.'
  )
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

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: $g-24;
    }

    &__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: $g-24;

      @media screen and (max-width: $sm) {
        width: 100%;
      }
    }

    &__title {
      font-size: $fs-40;

      @media screen and (max-width: $sm) {
        font-size: $fs-32;
      }
    }

    &__subtitle {
      font-size: $fs-20;
      font-weight: 400;
      height: 60px;

      @media screen and (max-width: $sm) {
        font-size: $fs-16;
      }
    }

    .phrase {
      display: flex;
      flex-direction: column;
      align-items: end;
    }
  }
</style>
