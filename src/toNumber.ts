import { ParsedUnit } from "./types";

export function toNumber(units: ParsedUnit[]): number {
  return units.map((p) => p.value * p.unit.value).reduce((a, b) => a + b, 0);
}
