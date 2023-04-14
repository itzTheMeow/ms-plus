import { toNumber } from "./toNumber";
import { toString } from "./toString";
import { toUnits } from "./toUnits";
import { FormatMSOptions } from "./types";

export * from "./types";

export interface MSParser {
  /**
   * Converts the input to a string.
   * @param opts Optional settings to tweak the output.
   */
  toString(opts?: FormatMSOptions): string;
  /** Converts the input to a number. */
  toNumber(): number;
  /**
   * Removes any unit matching the input number.
   * @param unit The unit value to remove.
   *
   * @example
   * ```ts
   * const units = ms("10m5s80ms");
   * // => 10 minutes, 5 seconds, 80 milliseconds
   *
   * ms.drop(1);
   * // => 10 minutes, 5 seconds
   *
   * ms.drop(ms("1 minute").toNumber());
   * // => 5 seconds
   * ```
   */
  drop(unit: number): MSParser;
}

/** Returns an object allowing formatting of the parsed millisecond or string input. Returns `null` if the input is invalid. */
export default function ms(val: number | string): MSParser | null {
  const units = toUnits(val);
  if (!units.length) return null;
  const parser: MSParser = {
    toString(opts) {
      return toString(units, opts);
    },
    toNumber() {
      return toNumber(units);
    },
    drop(dropped) {
      const i = units.findIndex((u) => u.unit.value == dropped);
      if (i >= 0) units.splice(i, 1);
      return parser;
    },
  };
  return parser;
}
