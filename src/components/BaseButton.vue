<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  cursor: pointer;
  padding: 1.6rem;
  font-weight: 700;
  border-radius: 1.2rem;
  display: grid;
  place-content: center;
}
</style>
