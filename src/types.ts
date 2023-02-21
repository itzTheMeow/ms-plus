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
