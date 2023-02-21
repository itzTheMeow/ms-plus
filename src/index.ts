import { MSLabel } from "./types";

const DEFAULT_LABELS: MSLabel[] = [
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

export * from "./types";

function isNum(string: string) {
  return !isNaN(Number(string)) && string != " ";
}

export interface ParsedUnit {
  num: number;
  unit: string;
  unitValue: number;
}
export interface FormatMsOptions {
  verbose?: boolean;
  space?: boolean;
  maxDepth?: number;
  commas?: boolean;
  conjunction?: boolean;
}

export function toMs(t: string): number | null {
  const parsed: ParsedUnit[] = [];

  for (let i = 0; i < t.length; i++) {
    if (isNum(t[i])) {
      let num = "";
      let unit = "";

      let i2;

      for (i2 = i; i2 < t.length; i2++) {
        if (t[i2] == " ") {
          i2++;
          break;
        } else if (isNum(t[i2])) {
          num += t[i2];
        } else {
          break;
        }
      }

      for (; i2 < t.length; i2++) {
        if (t[i2] == " ") {
          i2++;
          break;
        } else if (!isNum(t[i2])) {
          unit += t[i2];
        } else {
          break;
        }
      }

      if (parsed.find((p) => p.unit == unit)) return null;

      const foundUnit = DEFAULT_LABELS.find((l) =>
        [l.abbrev, l.singular, l.plural].map((s) => s.toLowerCase()).includes(unit.toLowerCase())
      );

      if (foundUnit) parsed.push({ num: Number(num), unit, unitValue: foundUnit.value });
      else return null;
      i = i2 - 1;
    } else {
      return null;
    }
  }

  return parsed.map((p) => p.num * p.unitValue).reduce((a, b) => a + b, 0);
}

export function formatMs(t: number, options: FormatMsOptions = {}): string {
  const verbose = typeof options.verbose == "boolean" ? options.verbose : false;
  const space = verbose ? true : typeof options.space == "boolean" ? options.space : false;
  const maxDepth =
    typeof options.maxDepth == "number" && Number.isFinite(options.maxDepth)
      ? options.maxDepth == 0
        ? Infinity
        : options.maxDepth
      : 2;

  const units = [];

  let tLeft = t;

  for (const label of DEFAULT_LABELS) {
    const newUnit = { num: Math.floor(tLeft / label.value), unit: label };
    if (newUnit.num != 0 || (units.length == 0 && label.value == 1)) {
      units.push(newUnit);
      tLeft = tLeft % label.value;
    }
  }

  const formattedUnits = units.slice(0, maxDepth).map((u) => {
    const unitName = verbose ? (u.num == 1 ? u.unit.singular : u.unit.plural) : u.unit.abbrev;
    return u.num + (verbose ? " " : "") + unitName;
  });

  let formatted = "";

  if (verbose) {
    if (formattedUnits.length >= 3) {
      formatted =
        formattedUnits.slice(0, formattedUnits.length - 1).join(", ") +
        ", and " +
        formattedUnits[formattedUnits.length - 1];
    } else {
      formatted = formattedUnits.join(" and ");
    }
  } else {
    formatted = formattedUnits.join(space ? " " : "");
  }

  return formatted;
}
