export type QuestionType = "capital" | "flag" | "population";

export type Question = {
  title: QuestionTitle;
  options: Option[];
};

export type Option = {
  id: string;
  value: string | number;
  correct: boolean;
  selected: boolean;
};

type QuestionTitle = {
  text: string;
  img?: Image;
};

type Image = { src: string; desc: string };
