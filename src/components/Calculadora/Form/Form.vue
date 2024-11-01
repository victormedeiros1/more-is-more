<template>
  <div class="form">
    <div class="form__group">
      <label class="form__label" for="input-amount">Montante</label>
      <input class="form__input" type="number" id="input-amount" />
    </div>

    <div class="form__group">
      <label class="form__label" for="input-time">Juros %</label>
      <input class="form__input" type="number" id="input-time" />
    </div>

    <div class="form__group">
      <button>CALCULAR</button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
