<script setup lang="ts">
import { useQuiz } from "@/quizStore";
import QuestionTitle from "@/components/QuestionTitle.vue";
import AnswerOptions from "@/components/AnswerOptions.vue";

const quizStore = useQuiz();
</script>

<template>
  <fieldset v-if="quizStore.question">
    <legend><QuestionTitle /></legend>
    <AnswerOptions />
  </fieldset>
</template>
