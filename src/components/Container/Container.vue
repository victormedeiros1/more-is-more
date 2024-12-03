<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    padding: $p-64;

    @media (width <= $sm) {
      min-height: 100svh;
      padding: $p-20;
    }
  }
</style>
