/**
 * Means of strictly typing nexus schema types to avoid random typos.
 * NOTE: values corresponding with database tables should match casing.
 */
export const enum SchemaTypes {
  Base = "base",
  Example = "example",
  ExampleInput = "example_input"
}
