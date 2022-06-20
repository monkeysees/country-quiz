import { defineStore } from "pinia";
import axios from "axios";

import type { Country, CountryRaw } from "@/models/country";
import type { Option } from "@/models/quiz";
import type { Question, QuestionType } from "@/models/quiz";
import { generateRandomNumber, getRandomElements } from "@/utils";

import { ANSWER_OPTIONS_COUNT } from "@/constants";

export const useQuiz = defineStore("quiz", {
  state: () => ({
    countries: <Country[]>[],
    question: <Question | null>null,
    stats: {
      currentScore: 0,
      maxScore: 0,
    },
    gameStatus: <"off" | "going" | "success" | "fail">"off",
    dataStatus: <"ok" | "loading" | "error">"ok",
  }),
  getters: {
    randomCountries: (state) => {
      if (!state.countries.length) {
        return () => [];
      }

      return (count: number) => getRandomElements(state.countries, count);
    },
    optionById: (state) => {
      return (optionId: string) =>
        state.question?.options.find((o) => o.id === optionId);
    },
    isGameStarted: (state) => state.gameStatus !== "off",
    isEndOfTurn: (state) =>
      state.gameStatus === "success" || state.gameStatus === "fail",
  },
  actions: {
    fetchCountries() {
      this.dataStatus = "loading";
      return axios
        .get<CountryRaw[]>("https://restcountries.com/v3.1/all")
        .then((res) => res.data)
        .then((countriesRaw) => {
          this.countries = extractCountriesFromRaw(countriesRaw);
          this.dataStatus = "ok";
        })
        .catch(() => (this.dataStatus = "error"));
    },
    generateNewQuestion() {
      if (!this.countries.length) {
        this.question = null;
        return;
      }

      const questionType = getRandomQuestionType();
      const countriesForQuestion = this.randomCountries(ANSWER_OPTIONS_COUNT);

      this.question = generateQuestion(questionType, countriesForQuestion);
    },
    nextTurn() {
      this.gameStatus = "going";
      this.generateNewQuestion();
    },
    startQuiz() {
      this.stats.currentScore = 0;
      this.nextTurn();
    },
    handleSelectedOption(selectedOptionId: string) {
      if (!this.question) {
        throw new Error("Question does not exist!");
      }

      const selectedOption = this.optionById(selectedOptionId);

      if (!selectedOption) {
        throw new Error(
          `Option with optionId ${selectedOptionId} does not exist!`
        );
      }

      selectedOption.selected = true;
      if (selectedOption.correct) {
        this.stats.currentScore += 1;
        this.gameStatus = "success";
      } else {
        if (this.stats.currentScore > this.stats.maxScore) {
          this.stats.maxScore = this.stats.currentScore;
        }
        this.gameStatus = "fail";
      }
    },
  },
});

function generateQuestion(type: QuestionType, selectedCountries: Country[]) {
  const correctCountryIdx = generateRandomNumber(selectedCountries.length - 1);
  const correctCountry = selectedCountries[correctCountryIdx];

  return {
    title: getQuestionTitle(type, correctCountry),
    options: getAnswerOptions(type, selectedCountries, correctCountryIdx),
  };
}

function getQuestionTitle(
  type: QuestionType,
  country: Country
): Question["title"] {
  switch (type) {
    case "capital":
      return generateQuestionTitle.forCapital(country.capital);
    case "flag":
      return generateQuestionTitle.forFlag(country.flag);
    case "population":
      return generateQuestionTitle.forPopulation(country.name);
  }
  throw new Error("All question type should generate question!");
}

const generateQuestionTitle = {
  forCapital: (capital: string) => ({
    text: `${capital} is the capital of`,
  }),
  forFlag: (flagImgSrc: string) => ({
    text: `Which country does this flag belong to?`,
    img: {
      src: flagImgSrc,
      desc: "The flag of the country to be guessed.",
    },
  }),
  forPopulation: (country: string) => ({
    text: `The population of ${country} is`,
  }),
};

function getAnswerOptions(
  questionType: QuestionType,
  selectedCountries: Country[],
  correctCountryIdx: number
): Option[] {
  switch (questionType) {
    case "capital":
      return generateAnswerOptions.asCountries(
        selectedCountries,
        correctCountryIdx
      );
    case "flag":
      return generateAnswerOptions.asCountries(
        selectedCountries,
        correctCountryIdx
      );
    case "population":
      return generateAnswerOptions
        .asPropValues(
          selectedCountries,
          "population",
          selectedCountries[correctCountryIdx].population
        )
        .map((option) => {
          option.value = option.value.toLocaleString();
          return option;
        });
  }
  throw new Error("All question type should generate question!");
}

const generateAnswerOptions = {
  asCountries: (selectedCountries: Country[], correctCountryIdx: number) =>
    selectedCountries.map((country, idx) => ({
      id: `answer-option__${idx}`,
      value: country.name,
      correct: idx === correctCountryIdx,
      selected: false,
    })),
  asPropValues: (
    selectedCountries: Country[],
    prop: keyof Country,
    correctValue: unknown
  ) =>
    selectedCountries.map((country, idx) => ({
      id: `answer-option__${idx}`,
      value: country[prop],
      correct: country[prop] === correctValue,
      selected: false,
    })),
};

function extractCountriesFromRaw(countriesRaw: CountryRaw[]) {
  const countries: Country[] = [];

  countriesRaw.forEach((c) => {
    const hasCapital = c.capital?.length;
    if (!hasCapital) {
      return;
    }

    countries.push(extractCountryFromRaw(c));
  });

  return countries;
}

function extractCountryFromRaw(countryRaw: CountryRaw) {
  if (!countryRaw.capital?.length) {
    throw new Error("Provided raw country does not have a capital.");
  }

  const preparedCountry: Country = {
    name: countryRaw.name.common,
    capital: countryRaw.capital[0],
    population: countryRaw.population,
    flag: countryRaw.flags.svg,
  };

  return preparedCountry;
}

function getRandomQuestionType() {
  const questionTypes: QuestionType[] = ["capital", "flag", "population"];
  const randomIdx = generateRandomNumber(questionTypes.length);

  return questionTypes[randomIdx];
}
