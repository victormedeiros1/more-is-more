<template>
  <div class="form">
    <div class="form__group">
      <Input />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  import Input from '@/components/Form/Input/Input.vue'

  const selic = ref<number>(0)

  const getSelic = async () => {
    const url =
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json'

    const response = await fetch(url).then((response) => response.json())
    selic.value = Number(response[0].valor)
  }

  onMounted(async () => {
    await getSelic()
    console.log(selic.value)
  })
</script>

<style scoped lang="scss">
  .form {
    &__group {
      margin-bottom: $p-16;
    }

    &__label {
      display: block;
      margin-bottom: $p-8;
    }

    &__input {
      width: 100%;
      padding: $p-8;
      border-radius: 0.5rem;
      border: 1px solid $gray-200;
    }
  }
</style>
