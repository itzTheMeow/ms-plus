import { toNumber } from "./toNumber";
import { toString } from "./toString";
import { toUnits } from "./toUnits";
import { FormatMSOptions } from "./types";

export * from "./types";

/** Returns an object allowing formatting of the parsed millisecond or string input. Returns `null` if the input is invalid. */
export default function ms(
  val: number | string
): { toString(opts?: FormatMSOptions): string; toNumber(): number } | null {
  const units = toUnits(val);
  if (!units.length) return null;
  return {
    toString(opts) {
      return toString(units, opts);
    },
    toNumber() {
      return toNumber(units);
    },
  };
}
