<template>
  <div class="form">
    <div class="form__header"></div>
    <div class="form__body">
      <div class="form__group">
        <Input
          id="input-amount"
          label="Montante"
          variant="amount"
          type="number"
          v-model:input-locked="formValues.inputLocked"
          v-model:model-value="formValues.amount"
        />
      </div>
      <div class="form__group">
        <Input
          id="input-rate"
          label="Juros"
          variant="rate"
          type="number"
          :tooltip-message="`Selic agora: ${selic}%`"
          v-model:input-locked="formValues.inputLocked"
          v-model:model-value="formValues.rate"
        />
      </div>
      <div class="form__group">
        <Input
          id="input-months"
          label="Meses"
          variant="months"
          type="number"
          v-model:input-locked="formValues.inputLocked"
          v-model:model-value="formValues.months"
        />
      </div>
      <div class="form__group">
        <Input
          id="input-contribution"
          label="Aporte"
          variant="contribution"
          type="number"
          v-model:input-locked="formValues.inputLocked"
          v-model:model-value="formValues.contribution"
        />
      </div>
    </div>
    <div class="form__footer">
      <Button @click="calculate">CALCULAR</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  import Button from '@/components/Button/Button.vue'
  import Input from '@/components/Form/Input/Input.vue'

  import { FormCalculator } from '@/types'

  const selic = ref<number>(0)

  const getSelic = async () => {
    const url =
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json'

    const response = await fetch(url).then((response) => response.json())
    selic.value = Number(response[0].valor)
  }

  const formValues = ref<FormCalculator>({
    amount: 0,
    rate: 0,
    months: 0,
    contribution: 0,
    inputLocked: 'input-amount'
  })

  const calculateAmount = ({ rate, months, contribution }: FormCalculator) => {
    const monthlyRate = rate / 12 / 100
    let currentAmount = 0

    for (let i = 0; i < months; i++) {
      currentAmount = currentAmount * (1 + monthlyRate) + contribution
    }

    return currentAmount
  }

  const calculateRate = ({ amount, months, contribution }: FormCalculator) => {
    let rate = 0
    let monthlyRate = 0
    let currentAmount = 0

    while (currentAmount < amount) {
      rate += 0.01
      monthlyRate = rate / 12 / 100
      currentAmount = 0
      for (let i = 0; i < months; i++) {
        currentAmount = currentAmount * (1 + monthlyRate) + contribution
      }
    }

    return rate
  }

  const calculateMonths = ({ amount, rate, contribution }: FormCalculator) => {
    const monthlyRate = rate / 12 / 100
    let currentAmount = 0
    let months = 0

    while (currentAmount < amount) {
      currentAmount = currentAmount * (1 + monthlyRate) + contribution
      months++
    }

    return months
  }

  const calculateContribution = ({ amount, rate, months }: FormCalculator) => {
    const monthlyRate = rate / 12 / 100
    let currentAmount = 0
    let contribution = 0

    for (let i = 0; i < months; i++) {
      currentAmount = currentAmount * (1 + monthlyRate) + contribution
    }

    contribution = (amount - currentAmount) / months

    return contribution
  }

  const calculationFunctions = {
    'input-amount': () => calculateAmount(formValues.value),
    'input-rate': () => calculateRate(formValues.value),
    'input-months': () => calculateMonths(formValues.value),
    'input-contribution': () => calculateContribution(formValues.value)
  }

  const calculate = () => {
    console.log(calculationFunctions[formValues.value.inputLocked]())
  }

  onMounted(async () => {
    await getSelic()
  })
</script>

<style lang="scss" scoped>
  .form {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: $g-24;

    &__body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: $g-16;
    }
  }
</style>
