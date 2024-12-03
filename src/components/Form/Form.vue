<template>
  <div class="form">
    <div class="form__group">
      <Input
        id="input-amount"
        label="Montante"
        variant="amount"
        type="number"
        v-model:model-value="form.amount"
      />
    </div>
    <div class="form__group">
      <Input
        id="input-rate"
        label="Juros"
        variant="rate"
        type="number"
        :tooltip-message="`Selic agora: ${selic}%`"
        v-model:model-value="form.rate"
      />
    </div>
    <div class="form__group">
      <Input
        id="input-months"
        label="Meses"
        variant="months"
        type="number"
        v-model:model-value="form.months"
      />
    </div>
    <div class="form__group">
      <Input
        id="input-contribution"
        label="Aporte"
        variant="contribution"
        type="number"
        v-model:model-value="form.contribution"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  import Input from '@/components/Form/Input/Input.vue'

  import { FormCalculator } from '@/types'

  const selic = ref<number>(0)

  const getSelic = async () => {
    const url =
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json'

    const response = await fetch(url).then((response) => response.json())
    selic.value = Number(response[0].valor)
  }

  const form = ref<FormCalculator>({
    amount: 0,
    rate: 0,
    months: 0,
    contribution: 0
  })

  onMounted(async () => {
    await getSelic()
  })
</script>

<style lang="scss" scoped>
  .form {
    width: 100%;
    max-width: 500px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $g-16;
  }
</style>
