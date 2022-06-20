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
    <p
      v-else-if="quizStore.dataStatus === 'loading'"
      class="app-status-message"
    >
      Loading…
    </p>
    <p v-else class="app-status-message">
      Oops, something went wrong.<br />Please try again later.
    </p>
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

.app-status-message {
  width: 40rem;
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-light);
}
</style>
