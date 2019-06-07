import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  stringArg
} from "nexus";
import { SchemaTypes } from "./schema-types";
import { NexusGenFieldTypes } from "../../generated/nexus-typings";

export type Topic = NexusGenFieldTypes[SchemaTypes.Topic];

export const topic = objectType({
  name: SchemaTypes.Topic,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.string("title");
    t.boolean("is_private");
    t.list.field("posts", {
      type: SchemaTypes.Post,
      nullable: true,
      resolve: (topic: Topic, {}, { services }) =>
        services.Post.getPostsForTopic(topic.id)
    });
    t.list.field("topic_users", {
      type: SchemaTypes.TopicUser,
      nullable: true,
      resolve: (topic: Topic, {}, { services, userId }) =>
        services.TopicUser.getUsersForTopic(topic.id, userId)
    });
  }
});

export const topicInputType = inputObjectType({
  name: SchemaTypes.TopicInput,
  definition(t) {
    t.id("id", { nullable: true });
    t.string("title");
    t.boolean("is_private");
  }
});

export const createTopic = mutationField("createTopic", {
  type: SchemaTypes.Topic,
  args: {
    payload: arg({ type: SchemaTypes.TopicInput, required: true })
  },
  resolve: async (parent, { payload }, { services, userId }) =>
    await services.Topic.save(payload, userId)
});

export const getTopic = queryField("topic", {
  type: SchemaTypes.Topic,
  nullable: true,
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services, userId }) =>
    await services.Topic.getTopic(id, userId)
});

export const updateTopic = mutationField("updateTopic", {
  type: SchemaTypes.Topic,
  args: {
    payload: arg({ type: SchemaTypes.TopicInput, required: true })
  },
  resolve: async (parent, { payload }, { services, userId }) =>
    await services.Topic.update(payload, userId)
});

export const deleteTopic = mutationField("deleteTopic", {
  type: "String",
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services, userId }) =>
    await services.Topic.remove(id)
});
