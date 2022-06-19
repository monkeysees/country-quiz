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
    <fieldset v-if="quizStore.question">
      <legend><QuestionTitle /></legend>
      <AnswerOptions />
    </fieldset>
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
  width: 40rem;

  @include mixin.respond-short-screen {
    width: 48rem;
  }
}

.button {
  justify-self: end;
  width: 11.6rem;
  height: 5.6rem;
  margin-top: 2.4rem;
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
    margin: 0 0 3.6rem;
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
