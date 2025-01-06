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
          :tooltip-message="`Selic agora: ${selic}`"
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

  const emit = defineEmits<{
    (event: 'update:message', value: string): void
  }>()

  const selic = ref<number | string>(0)

  const formValues = ref<FormCalculator>({
    amount: 0,
    rate: 0,
    months: 0,
    contribution: 0,
    inputLocked: 'input-amount'
  })

  const getSelic = async (): Promise<void> => {
    const url =
      'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json'

    try {
      const response = await fetch(url).then((response) => response.json())
      selic.value = Number(response[0].valor)
    } catch {
      selic.value = 'não possível receber o valor atual da Selic'
    }
  }

  const calculateAmount = ({ rate, months, contribution }: FormCalculator) => {
    const monthlyRate = rate / 12 / 100
    let currentAmount = 0
    for (let i = 0; i < months; i++) {
      currentAmount = currentAmount * (1 + monthlyRate) + contribution
    }
    return currentAmount
  }

  const calculateRate = ({ amount, months, contribution }: FormCalculator) => {
    let low = 0
    let high = 100
    let tolerance = 0.0001
    let rate = 0
    while (high - low > tolerance) {
      rate = (low + high) / 2
      const monthlyRate = rate / 12 / 100
      let currentAmount = 0
      for (let i = 0; i < months; i++) {
        currentAmount = currentAmount * (1 + monthlyRate) + contribution
      }
      if (currentAmount < amount) {
        low = rate
      } else {
        high = rate
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
    let contribution = amount / months
    let currentAmount = 0
    let tolerance = 0.01
    while (true) {
      currentAmount = 0
      for (let i = 0; i < months; i++) {
        currentAmount = currentAmount * (1 + monthlyRate) + contribution
      }
      if (Math.abs(currentAmount - amount) <= tolerance) {
        break
      }
      contribution += (amount - currentAmount) / months
    }
    return contribution
  }

  const chooseMessage = (key: string): string => {
    const values = formValues.value
    switch (key) {
      case 'input-amount':
        return `Montante de R$${calculateAmount(values).toFixed(2)} de Com aportes de R$${values.contribution} durante ${values.months} meses, com juros de ${values.rate}% ao ano, você terá R$${calculateAmount(values).toFixed(2)}`
      case 'input-rate':
        return `Juros de ${calculateRate(values).toFixed(2)}% ao ano. Para atingir R$${values.amount} com aportes de R$${values.contribution} durante ${values.months} meses, você precisa de uma taxa de juros de ${calculateRate(values).toFixed(2)}% ao ano`
      case 'input-months':
        return `${calculateMonths(values)} meses. Com aportes de R$${values.contribution} e juros de ${values.rate}% ao ano, você precisará de ${calculateMonths(values)} meses para atingir R$${values.amount}`
      case 'input-contribution':
        return `Aportes de R$${calculateContribution(values).toFixed(2)}. Para atingir R$${values.amount} com juros de ${values.rate}% ao ano em ${values.months} meses, você precisará fazer aportes de R$${calculateContribution(values).toFixed(2)}`
      default:
        return 'Entrada inválida'
    }
  }

  const emitMessage = (): void => {
    emit('update:message', chooseMessage(formValues.value.inputLocked))
  }

  const calculate = (): void => {
    emitMessage()
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
    s &__body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: $g-16;
    }
  }
</style>
