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

<style scoped lang="scss"></style>
