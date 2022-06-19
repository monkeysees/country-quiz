<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useQuiz } from "@/quizStore";
import QuizQuestion from "@/components/QuizQuestion.vue";
import QuestionDecoration from "@/assets/images/question.svg?component";

const quizStore = useQuiz();

const buttonClicked = ref(false);

onMounted(async () => {
  quizStore.startNewTurn();
  quizStore.generateNewQuestion();
});
</script>

<template>
  <section class="game">
    <QuestionDecoration class="decoration" />
    <QuizQuestion v-if="quizStore.isGameStarted" class="question" />
    <button
      class="button"
      :class="{ visible: quizStore.isEndOfTurn }"
      :disabled="buttonClicked"
      @click="() => (buttonClicked = true)"
    >
      {{ quizStore.gameStatus === "success" ? "Next" : "Finish" }}
    </button>
  </section>
</template>

<style lang="scss" scoped>
.game {
  --padding-inline: 3.2rem;

  width: calc(40rem + var(--padding-inline) * 2);
  padding: 6.8rem var(--padding-inline) 3.2rem;
  border-radius: 2.4rem;
  background-color: var(--color-light);
  position: relative;
  display: flex;
  flex-direction: column;
}

.decoration {
  width: 16.2rem;
  height: 11.6rem;
  position: absolute;
  bottom: calc(100% - 4.2rem);
  right: 0;
}

.question {
  margin-bottom: 2.4rem;
}

.button {
  cursor: pointer;
  align-self: flex-end;
  width: 11.6rem;
  height: 5.6rem;
  padding: 1.6rem 3.6rem;
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--color-light);
  background-color: var(--color-secondary);
  border-radius: 1.2rem;
  box-shadow: 0 0.2rem 0.4rem var(--color-secondary-shadow);
  display: grid;
  place-content: center;
  transform-origin: right;
  transition: visibility var(--transition-config),
    transform var(--transition-config);

  &:not(.visible) {
    visibility: hidden;
  }

  &:focus-visible {
    border: solid 0.3rem var(--color-primary);
  }

  &:enabled {
    &:hover,
    &:active {
      transform: scale(1.05);
    }
  }
}
</style>
