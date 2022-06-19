export type Country = {
  name: string;
  capital: string;
  population: number;
  flag: string;
};

export type CountryRaw = {
  name: {
    common: string;
    official: string;
    nativeName?: { [key: string]: { common: string; official: string } };
  };
  tld?: TLD[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status: "officially-assigned" | "user-assigned";
  unMember: boolean;
  currencies?: { [key: string]: { name: string; symbol?: string } };
  idd: { root?: string; suffixes?: string[] };
  capital?: string[];
  altSpellings: string[];
  region: "Europe" | "Africa" | "Oceania" | "Americas" | "Antarctic" | "Asia";
  subregion?: string;
  languages?: { [key: string]: string };
  translations: { [key: string]: { common: string; official: string } };
  latlng: latlng;
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms?: { [key: string]: { f: string; m: string } };
  flag: string;
  maps: { [key: string]: string };
  population: number;
  gini?: { [key: `${number}`]: number };
  fifa?: string;
  car: { signs?: string[]; side: "left" | "right" };
  timezones: timezone[];
  continents: continents[];
  flags: { png: string; svg: string };
  coatOfArms: { png?: string; svg?: string };
  startOfWeek: "monday" | "sunday" | "turday";
  capitalInfo: { latlng?: latlng };
  postalCode?: { format: string; regex?: string };
};

type digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type TLD = `.${string}` | `${string}.`;
type latlng = [number, number];
type continents =
  | "Europe"
  | "Africa"
  | "Oceania"
  | "South America"
  | "North America"
  | "Antarctica"
  | "Asia";
type timezone =
  | "UTC"
  | `UTC+${digit}${digit}:${digit}${digit}`
  | `UTC-${digit}${digit}:${digit}${digit}`;
