/**
 * Schema files consist of:
 * -The typescript class representation for the object.
 * -ObjectType: the nexus representation for the graphql query object.
 * -InputObjectType: the nexus representation for the graphql mutation object.
 * -QueryFields: the nexus representation of read operation resolvers.
 * -MutationFields: the nexus representation of write operation resolvers.
 */
import {
  objectType,
  mutationField,
  queryField,
  arg,
  stringArg,
  inputObjectType
} from "nexus";
import { SchemaTypes } from "./schema-types";
import Base from "./base";

export default class Example extends Base {
  name: string;
}

export const example = objectType({
  name: SchemaTypes.Example,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.string("name");
  }
});

export const exampleInputType = inputObjectType({
  name: SchemaTypes.ExampleInput,
  definition(t) {
    t.id("id", { nullable: true });
    t.string("name");
  }
});

export const createExample = mutationField("createExample", {
  type: SchemaTypes.Example,
  args: {
    payload: arg({ type: SchemaTypes.ExampleInput, required: true })
  },
  resolve: async (parent, { payload }, { services }) =>
    await services.Example.upsert(payload)
});

export const getExample = queryField("example", {
  type: SchemaTypes.Example,
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) =>
    await services.Example.get(id)
});

export const getExamples = queryField("examples", {
  type: SchemaTypes.Example,
  list: true,
  args: {},
  resolve: async (parent, {}, { services }) => await services.Example.query()
});

export const updateExample = mutationField("updateExample", {
  type: SchemaTypes.Example,
  args: {
    payload: arg({ type: SchemaTypes.ExampleInput, required: true })
  },
  resolve: async (parent, { payload }, { services }) =>
    await services.Example.upsert(payload)
});

export const deleteExample = mutationField("deleteExample", {
  type: "String",
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) =>
    await services.Example.remove(id)
});
