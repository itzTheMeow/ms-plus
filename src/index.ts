import { toNumber } from "./toNumber";
import { toString } from "./toString";
import { toUnits } from "./toUnits";

export * from "./types";

/** Returns an object allowing formatting of the parsed millisecond or string input. Returns `null` if the input is invalid. */
export default function ms(
  val: number | string
): { toString(): string; toNumber(): number } | null {
  const units = toUnits(val);
  if (!units.length) return null;
  return {
    toString() {
      return toString(units);
    },
    toNumber() {
      return toNumber(units);
    },
  };
}
