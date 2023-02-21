export interface MSLabel {
  /** Abbreviation of unit. (example: 'm') */
  abbrev: string;
  /** Singular word of unit. (example: 'minute') */
  singular: string;
  /** Plural word of unit. (example: 'minutes') */
  plural: string;
  /** Any aliases for parsing. (examples: 'min' 'mins') */
  aliases: string[];
  /** The milliseconds this unit equates to. */
  value: number;
}

/** Input example: "1m5s" */
export interface ParsedUnit {
  /** The value of this unit. (example: 5) */
  value: number;
  /** The label for this unit. (example: MSLabel for minutes) */
  unit: MSLabel;
}

export interface FormatStringOptions {
  verbose?: boolean;
  space?: boolean;
  maxDepth?: number;
  commas?: boolean;
  conjunction?: boolean;
}
