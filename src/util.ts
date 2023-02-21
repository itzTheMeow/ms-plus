import { MSLabel } from "./types";

export function isNum(string: string) {
  return !isNaN(Number(string)) && string != " ";
}
export function getTerms(label: MSLabel) {
  return [label.abbrev, label.singular, label.plural, ...label.aliases].map((l) => l.toLowerCase());
}

export type NumString<T, STR = string, NUM = number> = T extends number
  ? STR
  : T extends string
  ? NUM
  : never;

export const DEFAULT_LABELS: MSLabel[] = [
  {
    abbrev: "y",
    singular: "year",
    plural: "years",
    aliases: ["yr", "yrs"],
    value: 31536000000,
  },
  {
    abbrev: "mo",
    singular: "month",
    plural: "months",
    aliases: ["mos"],
    value: 2592000000,
  },
  {
    abbrev: "w",
    singular: "week",
    plural: "weeks",
    aliases: ["wk", "wks"],
    value: 604800000,
  },
  {
    abbrev: "d",
    singular: "day",
    plural: "days",
    aliases: [],
    value: 86400000,
  },
  {
    abbrev: "h",
    singular: "hour",
    plural: "hours",
    aliases: ["hr", "hrs"],
    value: 3600000,
  },
  {
    abbrev: "m",
    singular: "minute",
    plural: "minutes",
    aliases: ["min", "mins"],
    value: 60000,
  },
  {
    abbrev: "s",
    singular: "second",
    plural: "seconds",
    aliases: ["sec", "secs"],
    value: 1000,
  },
  {
    abbrev: "ms",
    singular: "millisecond",
    plural: "milliseconds",
    aliases: ["msec", "msecs"],
    value: 1,
  },
];
