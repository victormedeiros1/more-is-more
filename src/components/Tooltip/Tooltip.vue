<template>
  <div
    class="tooltip"
    @mouseenter="toggleTooltipView"
    @mouseleave="toggleTooltipView"
  >
    <div class="tooltip__icon">
      <img src="@/assets/images/tooltip.svg" />
    </div>

    <div v-if="isOpen" class="tooltip__balloon">
      <span class="tooltip__message">
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface Props {
    message: string
  }

  defineProps<Props>()

  const isOpen = ref<boolean>(false)

  const toggleTooltipView = (): void => {
    isOpen.value = !isOpen.value
  }
</script>

<style lang="scss" scoped>
  .tooltip {
    width: 1rem;
    height: 1rem;
    white-space: nowrap;
    position: relative;

    &__balloon {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      background-color: $background;
      border: 1px solid $primary--main;
      border-radius: 0.25rem;
      border-bottom-left-radius: 0;
      padding: $p-8;
    }
  }
</style>
