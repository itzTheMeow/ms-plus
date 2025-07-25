import { FormatMSOptions, ParsedUnit } from "./types.js";

export function toString(units: ParsedUnit[], options: FormatMSOptions = {}): string {
  const verbose = typeof options.verbose == "boolean" ? options.verbose : false;
  /*const space = verbose ? true : typeof options.space == "boolean" ? options.space : false;*/
  const maxDepth =
    typeof options.maxDepth == "number" && Number.isFinite(options.maxDepth)
      ? options.maxDepth == 0
        ? Infinity
        : options.maxDepth
      : 2;

  const formattedUnits = units.slice(0, maxDepth).map((u) => {
    const unitName = verbose ? (u.value == 1 ? u.unit.singular : u.unit.plural) : u.unit.abbrev;
    return u.value + (verbose ? " " : "") + unitName;
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
    formatted = formattedUnits.join(/*space ? " " : */ "");
  }

  return formatted;
}
