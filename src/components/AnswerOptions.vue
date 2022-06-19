<script setup lang="ts">
import { useQuiz } from "@/quizStore";
import AnswerOptionItem from "@/components/AnswerOptionItem.vue";

const quizStore = useQuiz();
</script>

<template>
  <ol v-if="quizStore.question" class="options-list">
    <AnswerOptionItem
      v-for="option in quizStore.question.options"
      :option="option"
      :key="option.id"
    />
  </ol>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixin";

.options-list {
  display: grid;
  row-gap: 2.8rem;
  counter-reset: list;

  @include mixin.respond-small-height {
    grid-template-columns: 1fr 1fr;
    column-gap: 2.8rem;
  }
}

ol > li::before {
  content: counter(list, upper-alpha);
  counter-increment: list;
}
</style>
