<script setup lang="ts">
import { useQuiz } from "@/quizStore";

const quizStore = useQuiz();
</script>

<template>
  <section v-if="quizStore.question">
    <img
      v-if="quizStore.question.title.img"
      :src="quizStore.question.title.img.src"
      :alt="quizStore.question.title.img.desc"
      class="image"
    />
    <h2 class="text">{{ quizStore.question.title.text }}</h2>
  </section>
</template>

<style lang="scss" scoped>
.image {
  width: 10.5rem;
  height: 6.75rem;
  filter: drop-shadow(0 0.4rem 2.4rem var(--color-dark-shadow));
  border-radius: 0.4rem;
  margin-bottom: 2.8rem;
}

.text {
  font-weight: 700;
  font-size: 2.4rem;
  color: var(--color-primary);
  margin-bottom: 3.2rem;
  display: inline-block; // otherwise margin-bottom does not appear in Safari
}
</style>
