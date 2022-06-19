<script setup lang="ts">
import type { Option } from "@/models/quiz";
import { computed } from "vue";
import { useQuiz } from "@/quizStore";
import iconsUrl from "@/assets/images/icons.svg";

const iconSuccessUrl = `${iconsUrl}#check`;
const iconFailUrl = `${iconsUrl}#cancel`;

const quizStore = useQuiz();

const props = defineProps<{ option: Option }>();

const optionStatus = computed(() => {
  if (!quizStore.isEndOfTurn) {
    return null;
  }

  if (props.option.correct) {
    return "option--success";
  }

  return props.option.selected ? "option--fail" : null;
});

function handleSelection() {
  quizStore.handleSelectedOption(props.option.id);
}
</script>

<template>
  <li :class="['option', optionStatus, { disabled: quizStore.isEndOfTurn }]">
    <label :for="option.id" class="label">{{ option.value }}</label>
    <input
      :id="option.id"
      :value="option.value"
      class="input"
      name="answer-option"
      type="radio"
      autocomplete="off"
      @click="handleSelection"
      :disabled="quizStore.isEndOfTurn"
    />
    <svg
      class="icon"
      :class="{
        'icon--shown':
          quizStore.isEndOfTurn && optionStatus === 'option--success',
      }"
      aria-label="Success icon"
    >
      <use :href="iconSuccessUrl" />
    </svg>
    <svg
      class="icon"
      :class="{
        'icon--shown': quizStore.isEndOfTurn && optionStatus === 'option--fail',
      }"
      aria-label="Fail icon"
    >
      <use :href="iconFailUrl" />
    </svg>
  </li>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/mixin";

.option {
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--color-primary-light);
  border: solid 0.2rem var(--color-primary-light);
  border-radius: 1.2rem;
  transition: color var(--transition-config),
    background-color var(--transition-config),
    border-color var(--transition-config);
  display: grid;
  grid-template-areas: "padding-inline-start letter letter-margin label icon-margin icon padding-inline-end";
  grid-template-columns: 1.8rem 1ch 4.5rem 1fr 1.8rem 2rem 1.8rem;
  align-items: center;

  @include mixin.respond-small-height {
    grid-template-columns: 1.8rem 1ch 2.5rem 1fr 1.8rem 2rem 1.8rem;
  }

  &:not(.disabled) {
    &:hover,
    &:focus-within {
      color: var(--color-light);
      border-color: var(--color-secondary);
      background-color: var(--color-secondary);
    }
  }

  &--success {
    color: var(--color-light);
    background-color: var(--color-success);
    border-color: var(--color-success);
  }

  &--fail {
    color: var(--color-light);
    background-color: var(--color-error);
    border-color: var(--color-error);
  }

  &::before {
    grid-area: letter;
  }
}

.label {
  grid-area: label;
  padding: 1.6rem 0;
}

.input {
  width: 100%;
  height: 100%;
  grid-column: 1 / -1;
  grid-row: 1 / span 1;
  cursor: pointer;

  &[disabled] {
    cursor: unset;
  }
}

.icon {
  width: 2rem;
  height: 2rem;
  fill: var(--color-light);
  visibility: hidden;
  position: absolute;
  opacity: 0;
  transition: opacity var(--transition-config);

  &--shown {
    visibility: unset;
    position: unset;
    opacity: 1;
    grid-area: icon;
  }
}
</style>
