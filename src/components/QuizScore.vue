<script setup lang="ts">
import { ref } from "vue";

import { useQuiz } from "@/quizStore";
import BaseButton from "@/components/BaseButton.vue";

const quizStore = useQuiz();

const buttonClicked = ref(false);

const emit = defineEmits<{
  (e: "restart-quiz"): void;
}>();

function handleButtonClick() {
  buttonClicked.value = true;
  emit("restart-quiz");
  buttonClicked.value = false;
}

const pluralAnswers = (score: number) => (score === 1 ? "answer" : "answers");
</script>

<template>
  <section class="results">
    <h2 class="results__heading">Results</h2>
    <p class="results__statistic">
      You got
      <span class="results__score">{{ quizStore.stats.currentScore }}</span>
      correct {{ pluralAnswers(quizStore.stats.currentScore) }}!
    </p>
    <p class="results__statistic">
      Your max score is
      <span class="results__score">{{ quizStore.stats.maxScore }}</span>
    </p>
    <BaseButton
      class="button"
      :disabled="buttonClicked"
      @click="handleButtonClick"
    >
      {{ "Try again" }}
    </BaseButton>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixin";

.results {
  color: var(--color-primary);
  display: grid;
  justify-items: center;
  width: 40rem;

  &__heading {
    font-size: 4.8rem;
    font-weight: 700;
  }

  &__statistic {
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    column-gap: 1ch;
  }

  &__score {
    color: var(--color-success);
    font-size: 3.2rem;
    font-weight: 700;
  }
}

.button {
  width: 20.9rem;
  height: 6.2rem;
  margin-top: 4.8rem;
  font-weight: 600;
  font-size: 1.8rem;
  border: 0.2rem solid var(--color-primary);
  transition: transform var(--transition-config);

  @include mixin.respond-tiny-height {
    margin-top: 4rem;
  }

  &:focus-visible {
    text-decoration: 0.2rem underline;
    border-width: 0.3rem;
  }

  &:enabled {
    &:hover,
    &:active {
      transform: scale(1.05);
    }
  }
}
</style>
