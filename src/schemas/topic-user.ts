import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  stringArg,
  enumType
} from "nexus";
import { SchemaTypes } from "./schema-types";
import { NexusGenFieldTypes } from "../../generated/nexus-typings";

export type TopicUser = NexusGenFieldTypes[SchemaTypes.TopicUser];

export const TopicUser = objectType({
  name: SchemaTypes.TopicUser,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.id("user_id");
    t.id("topic_id");
    t.field("topic_role", { type: SchemaTypes.TopicUserRoles });
    t.field("topic", {
      type: SchemaTypes.Topic,
      nullable: true,
      resolve: (topicUser: TopicUser, {}, { services, userId }) =>
        services.Topic.getTopic(topicUser.topic_id, userId)
    });
    t.field("user", {
      type: SchemaTypes.User,
      nullable: true,
      resolve: (topicUser: TopicUser, {}, { services }) =>
        services.User.get(topicUser.user_id)
    });
  }
});

export const TopicUserInputType = inputObjectType({
  name: SchemaTypes.TopicUserInput,
  definition(t) {
    t.id("user_id");
    t.id("topic_id");
    t.field("topic_role", { type: SchemaTypes.TopicUserRoles });
  }
});

export enum TopicUserRolesEnum {
  Owner = "owner",
  Moderator = "moderator",
  Contributor = "contributor",
  Viewer = "viewer"
}

export const TopicUserRoles = enumType({
  name: SchemaTypes.TopicUserRoles,
  members: [
    TopicUserRolesEnum.Owner,
    TopicUserRolesEnum.Moderator,
    TopicUserRolesEnum.Contributor,
    TopicUserRolesEnum.Viewer
  ]
});

export const createTopicUser = mutationField("createTopicUser", {
  type: SchemaTypes.TopicUser,
  args: {
    payload: arg({ type: SchemaTypes.TopicUserInput, required: true })
  },
  resolve: async (parent, { payload }, { services, userId }) =>
    await services.TopicUser.save(payload, userId)
});

export const getTopicUser = queryField("TopicUser", {
  type: SchemaTypes.TopicUser,
  nullable: true,
  args: {
    user_id: stringArg({ required: true }),
    topic_id: stringArg({ required: true })
  },
  resolve: async (parent, { user_id, topic_id }, { services, userId }) =>
    await services.TopicUser.getTopicUser(user_id, topic_id, userId)
});

export const getTopicUsers = queryField("TopicUsers", {
  type: SchemaTypes.TopicUser,
  list: true,
  args: { topic_id: stringArg({ required: true }) },
  resolve: async (parent, { topic_id }, { services, userId }) =>
    await services.TopicUser.getUsersForTopic(topic_id, userId)
});

export const deleteTopicUser = mutationField("deleteTopicUser", {
  type: "String",
  args: {
    user_id: stringArg({ required: true }),
    topic_id: stringArg({ required: true })
  },
  resolve: async (parent, { user_id, topic_id }, { services, userId }) =>
    await services.TopicUser.remove(user_id, topic_id, userId)
});
