<script setup lang="ts">
import { ref } from "vue";

import { useQuiz } from "@/quizStore";
import BaseButton from "@/components/BaseButton.vue";
import QuestionTitle from "@/components/QuestionTitle.vue";
import AnswerOptions from "@/components/AnswerOptions.vue";

const quizStore = useQuiz();

const buttonClicked = ref(false);

const emit = defineEmits<{
  (e: "finish-quiz"): void;
}>();

function handleButtonClick() {
  buttonClicked.value = true;
  if (quizStore.gameStatus === "success") {
    quizStore.nextTurn();
    buttonClicked.value = false;
  } else {
    emit("finish-quiz");
  }
}
</script>

<template>
  <section class="question">
    <fieldset v-if="quizStore.question" class="prompt">
      <legend><QuestionTitle /></legend>
      <AnswerOptions />
    </fieldset>
    <p class="score">Current score: {{ quizStore.stats.currentScore }}</p>
    <BaseButton
      class="button"
      :class="{ visible: quizStore.isEndOfTurn }"
      :disabled="buttonClicked"
      @click="handleButtonClick"
    >
      {{ quizStore.gameStatus === "success" ? "Next" : "Results" }}
    </BaseButton>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixin";

.question {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 40rem;
  row-gap: 3.2rem;

  @include mixin.respond-small-height {
    width: 48rem;
  }
}

.prompt {
  grid-column: 1 / -1;
}

.score {
  align-self: center;
  color: var(--color-primary);
  font-size: 2rem;
  font-weight: 600;
}

.button {
  justify-self: end;
  width: 11.6rem;
  height: 5.6rem;
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--color-light);
  background-color: var(--color-secondary);
  box-shadow: 0 0.2rem 0.4rem var(--color-secondary-shadow);
  transform-origin: right;
  transition: transform var(--transition-config),
    height var(--transition-config), padding var(--transition-config),
    margin var(--transition-config);

  &:not(.visible) {
    visibility: hidden;
    height: 0;
    padding: 0;
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
