<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useQuiz } from "@/quizStore";
import QuestionDecoration from "@/assets/images/question.svg?component";
import ResutsDecoration from "@/assets/images/results.svg?component";
import QuestionPrompt from "@/components/QuestionPrompt.vue";
import QuizScore from "@/components/QuizScore.vue";

const quizStore = useQuiz();

const showStats = ref(false);

function handleQuizRestart() {
  quizStore.restartQuiz();
  showStats.value = false;
}

function handleQuizFinish() {
  showStats.value = true;
}

onMounted(async () => {
  quizStore.nextTurn();
});
</script>

<template>
  <section class="game">
    <QuestionDecoration
      v-if="!showStats"
      class="decoration decoration--question"
    />
    <ResutsDecoration v-if="showStats" class="decoration decoration--results" />
    <QuestionPrompt
      v-if="quizStore.isGameStarted && !showStats"
      class="question"
      @finish-quiz="handleQuizFinish"
    />
    <QuizScore v-if="showStats" @restart-quiz="handleQuizRestart" />
  </section>
</template>

<style lang="scss" scoped>
.game {
  padding: 6.8rem 3.2rem 3.2rem;
  border-radius: 2.4rem;
  background-color: var(--color-light);
  position: relative;
  display: grid;
  justify-items: center;
}

.decoration {
  &--question {
    width: 16.2rem;
    height: 11.6rem;
    position: absolute;
    bottom: calc(100% - 4.2rem);
    right: 0;
  }

  &--results {
    width: 23.8rem;
    height: 12.85rem;
    margin-top: -1.8rem;
    margin-bottom: 7.2rem;
  }
}
</style>
