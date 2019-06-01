import { interfaceType, asNexusMethod } from "nexus";
import { SchemaTypes } from "./schema-types";
import { GraphQLDateTime } from "graphql-iso-date";
import { NexusGenFieldTypes } from "./../../generated/nexus-typings";

/**
 * Registers GraphQLDateTime scalar type to nexus (ex: t.date("my_date_time")).
 */
export const GQLDate = asNexusMethod(GraphQLDateTime, "date");

/**
 * Abstract parent class defining default properties.
 */
export type Base = NexusGenFieldTypes[SchemaTypes.Base];

/**
 * Nexus schema representation of the Base class.
 */
export const base = interfaceType({
  name: SchemaTypes.Base,
  definition(t) {
    t.id("id");
    t.boolean("deleted");
    // @ts-ignore
    t.date("created_at");
    // @ts-ignore
    t.date("updated_at");
    t.resolveType(() => null);
  }
});
