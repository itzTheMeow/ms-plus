import { ParsedUnit } from "./types";
import { DEFAULT_LABELS, getTerms } from "./util";

export function toUnits(t: string | number): ParsedUnit[] {
  const parsed: ParsedUnit[] = [];

  if (typeof t == "string") {
    /*
      Polyfill if needed.
      https://gist.github.com/TheBrenny/039add509c87a3143b9c077f76aa550b
    */
    const matches = [
      ...t.matchAll(
        new RegExp(
          // |== Match the digit portion. (100 1,000 0.1)
          // V      VV Allow spaces between the digit and label.
          `([\\d.,]+) *(${
            // Match every term for the label.
            DEFAULT_LABELS.map(getTerms).flat(1).join("|")
            // |= Positive lookahead.
            // V    V===== Ensures there's a "terminator" character after the term.
          })(?=\\d| |\n|$|,)`,
          "gi"
        )
      ),
    ];
    for (const label of DEFAULT_LABELS) {
      const has = matches.filter((m) => getTerms(label).includes(m[2]?.toLowerCase()));
      for (const h of has) {
        const value = Number(h[1].replace(/,/g, ""));
        const i = parsed.find((p) => p.unit.value == label.value);
        if (i) {
          i.value += value;
        } else {
          parsed.push({
            unit: label,
            value,
          });
        }
      }
    }
  }
  if (typeof t == "number" || (!parsed.length && !isNaN(Number(t)))) {
    let tLeft = Math.abs(Number(t));
    for (const label of DEFAULT_LABELS) {
      const newUnit: ParsedUnit = {
        value: Math.floor(tLeft / label.value),
        unit: label,
      };
      if (newUnit.value != 0 || (parsed.length == 0 && label.value == 1)) {
        parsed.push(newUnit);
        tLeft = tLeft % label.value;
      }
    }
  }

  return parsed.sort((p1, p2) => p2.unit.value - p1.unit.value);
}
