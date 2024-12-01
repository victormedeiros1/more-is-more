<template>
  <div class="input">
    <div class="input__header">
      <label class="input__label" :for="id">{{ label }}</label>
      <Tooltip v-if="tooltipMessage" :message="tooltipMessage" />
    </div>
    <div class="input__body">
      <button class="input__toggle">
        <img src="@/assets/images/unlock.svg" />
      </button>
      <div class="input__icon">
        <img :src="inputIcon[variant].icon" />
      </div>
      <input :id="id" class="input__field" :type="type" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Tooltip from '@/components/Tooltip/Tooltip.vue'

  import { InputVariants } from '@/types'

  interface Props {
    id: string
    label: string
    variant: InputVariants
    type: 'number'
    tooltipMessage?: string
  }

  defineProps<Props>()

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
      background-color: $primary--main;
      box-shadow: $shadow;
      height: 24px;
      border: 0;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      padding: $p-4;
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
    }
  }
</style>
