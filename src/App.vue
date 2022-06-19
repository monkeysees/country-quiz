<script setup lang="ts">
import { onMounted } from "vue";
import QuizGame from "@/components/QuizGame.vue";
import { useQuiz } from "@/quizStore";

const quizStore = useQuiz();

onMounted(() => quizStore.fetchCountries());
</script>

<template>
  <main class="app-main">
    <h1 class="app-heading">Country Quiz</h1>
    <QuizGame v-if="quizStore.countries.length" />
  </main>
</template>

<style lang="scss">
@import "@/assets/styles/main";

.app-main {
  padding: 3.2rem;
}

.app-heading {
  font-weight: 700;
  font-size: 3.6rem;
  text-transform: uppercase;
  color: var(--color-light);
  margin-bottom: 1rem;
}
</style>
