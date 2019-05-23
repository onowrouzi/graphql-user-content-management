import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  stringArg
} from "nexus";
import { SchemaTypes } from "./schema-types";
import { NexusGenFieldTypes } from "../../generated/typings";

export type User = NexusGenFieldTypes[SchemaTypes.User];

export const user = objectType({
  name: SchemaTypes.User,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.id("id");
    t.string("first_name");
    t.string("last_name");
    t.string("email");
    t.list.field("posts", {
      type: SchemaTypes.Post,
      nullable: true,
      resolve: async (user: User, {}, { services }) =>
        await services.Post.query(user.id)
    });
    t.list.field("likes", {
      type: SchemaTypes.UserLike,
      nullable: true,
      resolve: async (user: User, {}, { services }) =>
        await services.UserLike.query(user.id)
    });
  }
});

export const userInputType = inputObjectType({
  name: SchemaTypes.UserInput,
  definition(t) {
    t.id("id", { nullable: true });
    t.string("first_name");
    t.string("last_name");
    t.string("email");
  }
});

export const loginUser = queryField("loginUser", {
  type: SchemaTypes.User,
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true })
  },
  resolve: async (parent, { email, password }, { services }) =>
    await services.User.login(email, password)
});

export const createUser = mutationField("createUser", {
  type: SchemaTypes.User,
  args: {
    payload: arg({ type: SchemaTypes.UserInput, required: true }),
    password: stringArg({ required: true })
  },
  resolve: async (parent, { payload, password }, { services }) =>
    await services.User.create(payload, password)
});

export const getUser = queryField("user", {
  type: SchemaTypes.User,
  nullable: true,
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) => await services.User.get(id)
});

export const updateUser = mutationField("updateUser", {
  type: SchemaTypes.User,
  args: {
    payload: arg({ type: SchemaTypes.UserInput, required: true })
  },
  resolve: async (parent, { payload }, { services }) =>
    await services.User.update(payload)
});

export const deleteUser = mutationField("deleteUser", {
  type: "String",
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) =>
    await services.User.remove(id)
});