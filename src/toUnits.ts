import { ParsedUnit } from "./types";
import { DEFAULT_LABELS, isNum } from "./util";

export function toUnits(t: string | number): ParsedUnit[] {
  const parsed: ParsedUnit[] = [];

  if (typeof t == "string") {
    for (let i = 0; i < t.length; i++) {
      if (isNum(t[i])) {
        let num = "";
        let matched = "";

        let i2: number;

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
            matched += t[i2];
          } else {
            break;
          }
        }

        if (parsed.find((p) => p.matched == matched)) return [];

        const foundUnit = DEFAULT_LABELS.find((l) =>
          [l.abbrev, l.singular, l.plural, ...l.aliases]
            .map((s) => s.toLowerCase())
            .includes(matched.toLowerCase())
        );

        if (foundUnit) parsed.push({ value: Number(num), unit: foundUnit, matched });
        else return [];
        i = i2 - 1;
      } else {
        return [];
      }
    }
  } else if (typeof t == "number") {
    const units: ParsedUnit[] = [];

    let tLeft = t;
    for (const label of DEFAULT_LABELS) {
      const newUnit: ParsedUnit = { value: Math.floor(tLeft / label.value), unit: label };
      if (newUnit.value != 0 || (units.length == 0 && label.value == 1)) {
        units.push(newUnit);
        tLeft = tLeft % label.value;
      }
    }
  }

  return parsed;
}
