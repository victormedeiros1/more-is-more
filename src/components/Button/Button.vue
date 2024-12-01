<template>
  <button class="button">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .button {
    width: 100%;
    max-width: 500px;
    background-color: $primary--main;
    color: $light;
    cursor: pointer;
    font-size: $fs-14;
    font-weight: 700;
    border: none;
    border-radius: 0.25rem;
    box-shadow: $button--shadow;
    transition: 0.1s;
    padding: $p-8 $p-16;

    &:hover {
      background-color: $primary--dark;
    }

    &:active {
      box-shadow: $button--shadow--active;
      transform: translateY(0.3125rem);
    }
  }
</style>
