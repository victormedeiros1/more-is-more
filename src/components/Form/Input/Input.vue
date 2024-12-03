<template>
  <div class="input">
    <div class="input__header">
      <label class="input__label" :for="id">{{ label }}</label>
      <Tooltip v-if="tooltipMessage" :message="tooltipMessage" />
    </div>
    <div class="input__body">
      <button class="input__toggle" @click="toggleLock">
        <img v-if="thisInputIsLocked" src="@/assets/images/lock.svg" />
        <img v-else src="@/assets/images/unlock.svg" />
      </button>
      <div class="input__icon">
        <img :src="inputIcon[variant].icon" />
      </div>
      <input
        :id="id"
        class="input__field"
        :class="thisInputIsLocked ? 'input__field--disabled' : ''"
        :type="type"
        :disabled="thisInputIsLocked"
        @input="emitValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import Tooltip from '@/components/Tooltip/Tooltip.vue'

  import { InputVariants } from '@/types'

  interface Props {
    id: string
    label: string
    variant: InputVariants
    type: 'number'
    tooltipMessage?: string
    inputLocked: string
  }

  const props = defineProps<Props>()

  const emit = defineEmits<{
    (event: 'update:inputLocked', value: string): void
    (event: 'update:modelValue', value: number): void
  }>()

  const inputIcon = {
    amount: {
      icon: '/src/assets/images/money.svg'
    },
    rate: {
      icon: '/src/assets/images/rate.svg'
    },
    months: {
      icon: '/src/assets/images/calendar.svg'
    },
    contribution: {
      icon: '/src/assets/images/money.svg'
    }
  }

  const isLocked = computed({
    get: (): string => props.inputLocked,
    set: (value: string): void => {
      console.log('value', value)
      emit('update:inputLocked', value)
    }
  })

  const thisInputIsLocked = computed(() => isLocked.value === props.id)

  const toggleLock = (): void => {
    console.log('toggleLock', props.id)
    isLocked.value = props.id
  }

  const emitValue = (event: Event): void => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', Number(target.value))
  }
</script>

<style lang="scss" scoped>
  .input {
    display: flex;
    flex-direction: column;
    gap: $g-4;

    &__header {
      display: flex;
      align-items: center;
      gap: $g-4;
    }

    &__label {
      font-weight: 500;
    }

    &__body {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__toggle {
      cursor: pointer;
      background-color: $primary--main;
      box-shadow: $shadow;
      height: 24px;
      border: 0;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      padding: $p-4;

      &:hover {
        background-color: $primary--dark;
      }
    }

    &__icon {
      background-color: $primary--main;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      padding: 0.4375rem;
    }

    &__field {
      background-color: transparent;
      width: 100%;
      font-size: $fs-14;
      font-weight: 500;
      border: 1px solid $primary--main;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      padding: $p-8;

      &::placeholder {
        color: $primary--light;
      }

      &--disabled {
        opacity: 0.3;
      }
    }
  }
</style>
