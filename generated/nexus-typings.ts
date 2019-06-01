/**
 * This file was automatically generated by Nexus 0.11.7
 * Do not make changes to this file directly
 */


import { core } from "nexus"
declare global {
  interface NexusGenCustomDefinitionMethods<TypeName extends string> {
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  comment_input: { // input type
    comment_id?: string | null; // ID
    content?: string | null; // String
    id?: string | null; // ID
    post_id?: string | null; // ID
    user_id?: string | null; // ID
  }
  post_input: { // input type
    content?: string | null; // String
    id?: string | null; // ID
    title?: string | null; // String
    user_id?: string | null; // ID
  }
  user_input: { // input type
    email?: string | null; // String
    first_name?: string | null; // String
    id?: string | null; // ID
    last_name?: string | null; // String
  }
  user_like_input: { // input type
    content_id?: string | null; // ID
    content_type?: NexusGenEnums['like_types'] | null; // like_types
    liked?: boolean | null; // Boolean
    user_id?: string | null; // ID
  }
}

export interface NexusGenEnums {
  like_types: "comment" | "post"
}

export interface NexusGenRootTypes {
  Mutation: {};
  Query: {};
  app_token: { // root type
    expiresAt: any; // DateTime!
    refreshToken?: string | null; // String
    token: string; // String!
  }
  comment: { // root type
    comment_id?: string | null; // ID
    content: string; // String!
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    id: string; // ID!
    post_id?: string | null; // ID
    updated_at: any; // DateTime!
    user_id: string; // ID!
  }
  post: { // root type
    content: string; // String!
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    id: string; // ID!
    title: string; // String!
    updated_at: any; // DateTime!
    user_id: string; // ID!
  }
  user: { // root type
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    email: string; // String!
    first_name: string; // String!
    id: string; // ID!
    last_name: string; // String!
    updated_at: any; // DateTime!
  }
  user_like: { // root type
    content_id: string; // ID!
    content_type: NexusGenEnums['like_types']; // like_types!
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    id: string; // ID!
    liked: boolean; // Boolean!
    updated_at: any; // DateTime!
    user_id: string; // ID!
  }
  base: NexusGenRootTypes['comment'] | NexusGenRootTypes['user_like'] | NexusGenRootTypes['post'] | NexusGenRootTypes['user'];
  likable_content: NexusGenRootTypes['comment'] | NexusGenRootTypes['post'];
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
  like_types_union: NexusGenRootTypes['comment'] | NexusGenRootTypes['post'];
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  comment_input: NexusGenInputs['comment_input'];
  post_input: NexusGenInputs['post_input'];
  user_input: NexusGenInputs['user_input'];
  user_like_input: NexusGenInputs['user_like_input'];
  like_types: NexusGenEnums['like_types'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createComment: NexusGenRootTypes['comment']; // comment!
    createPost: NexusGenRootTypes['post']; // post!
    createUser: NexusGenRootTypes['user']; // user!
    createUserLike: NexusGenRootTypes['user_like']; // user_like!
    deleteComment: string; // String!
    deletePost: string; // String!
    deleteUser: string; // String!
    deleteUserLike: string; // String!
    loginUser: NexusGenRootTypes['app_token']; // app_token!
    updateComment: NexusGenRootTypes['comment']; // comment!
    updatePost: NexusGenRootTypes['post']; // post!
    updateUser: NexusGenRootTypes['user']; // user!
    updateUserLike: NexusGenRootTypes['user_like']; // user_like!
    useRefreshToken: NexusGenRootTypes['app_token']; // app_token!
  }
  Query: { // field return type
    comment: NexusGenRootTypes['comment'] | null; // comment
    contentLikes: NexusGenRootTypes['user_like'][]; // [user_like!]!
    getCommentReplies: NexusGenRootTypes['comment'][]; // [comment!]!
    getCommentsForPost: NexusGenRootTypes['comment'][]; // [comment!]!
    getPostsForUser: NexusGenRootTypes['post'][]; // [post!]!
    post: NexusGenRootTypes['post'] | null; // post
    user: NexusGenRootTypes['user'] | null; // user
    userLike: NexusGenRootTypes['user_like'] | null; // user_like
    userLikes: NexusGenRootTypes['user_like'][]; // [user_like!]!
  }
  app_token: { // field return type
    expiresAt: any; // DateTime!
    refreshToken: string | null; // String
    token: string; // String!
  }
  comment: { // field return type
    comment_id: string | null; // ID
    content: string; // String!
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    dislikes_count: number; // Int!
    id: string; // ID!
    likes: NexusGenRootTypes['user_like'][] | null; // [user_like!]
    likes_count: number; // Int!
    post: NexusGenRootTypes['post']; // post!
    post_id: string | null; // ID
    replies: NexusGenRootTypes['comment'][] | null; // [comment!]
    reply_depth: number; // Int!
    updated_at: any; // DateTime!
    user: NexusGenRootTypes['user'] | null; // user
    user_id: string; // ID!
  }
  post: { // field return type
    comments: NexusGenRootTypes['comment'][] | null; // [comment!]
    content: string; // String!
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    dislikes_count: number; // Int!
    id: string; // ID!
    likes: NexusGenRootTypes['user_like'][] | null; // [user_like!]
    likes_count: number; // Int!
    title: string; // String!
    updated_at: any; // DateTime!
    user: NexusGenRootTypes['user'] | null; // user
    user_id: string; // ID!
  }
  user: { // field return type
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    email: string; // String!
    first_name: string; // String!
    id: string; // ID!
    last_name: string; // String!
    likes: NexusGenRootTypes['user_like'][] | null; // [user_like!]
    posts: NexusGenRootTypes['post'][] | null; // [post!]
    updated_at: any; // DateTime!
  }
  user_like: { // field return type
    content: NexusGenRootTypes['like_types_union']; // like_types_union!
    content_id: string; // ID!
    content_type: NexusGenEnums['like_types']; // like_types!
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    id: string; // ID!
    liked: boolean; // Boolean!
    updated_at: any; // DateTime!
    user: NexusGenRootTypes['user']; // user!
    user_id: string; // ID!
  }
  base: { // field return type
    created_at: any; // DateTime!
    deleted: boolean; // Boolean!
    id: string; // ID!
    updated_at: any; // DateTime!
  }
  likable_content: { // field return type
    content: string; // String!
    dislikes_count: number; // Int!
    id: string; // ID!
    likes: NexusGenRootTypes['user_like'][] | null; // [user_like!]
    likes_count: number; // Int!
    user: NexusGenRootTypes['user'] | null; // user
    user_id: string; // ID!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createComment: { // args
      payload: NexusGenInputs['comment_input']; // comment_input!
    }
    createPost: { // args
      payload: NexusGenInputs['post_input']; // post_input!
    }
    createUser: { // args
      password: string; // String!
      payload: NexusGenInputs['user_input']; // user_input!
    }
    createUserLike: { // args
      payload: NexusGenInputs['user_like_input']; // user_like_input!
    }
    deleteComment: { // args
      id: string; // String!
    }
    deletePost: { // args
      id: string; // String!
    }
    deleteUser: { // args
      id: string; // String!
    }
    deleteUserLike: { // args
      content_id: string; // String!
      user_id: string; // String!
    }
    loginUser: { // args
      email: string; // String!
      password: string; // String!
    }
    updateComment: { // args
      payload: NexusGenInputs['comment_input']; // comment_input!
    }
    updatePost: { // args
      payload: NexusGenInputs['post_input']; // post_input!
    }
    updateUser: { // args
      payload: NexusGenInputs['user_input']; // user_input!
    }
    updateUserLike: { // args
      payload: NexusGenInputs['user_like_input']; // user_like_input!
    }
    useRefreshToken: { // args
      refreshToken: string; // String!
    }
  }
  Query: {
    comment: { // args
      id: string; // String!
    }
    contentLikes: { // args
      content_id: string; // String!
    }
    getCommentReplies: { // args
      comment_id: string; // String!
    }
    getCommentsForPost: { // args
      post_id: string; // String!
    }
    getPostsForUser: { // args
      user_id: string; // String!
    }
    post: { // args
      id: string; // String!
    }
    user: { // args
      id: string; // String!
    }
    userLike: { // args
      content_id: string; // String!
      user_id: string; // String!
    }
    userLikes: { // args
      user_id: string; // String!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
  like_types_union: "comment" | "post"
  base: "comment" | "user_like" | "post" | "user"
  likable_content: "comment" | "post"
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Query" | "app_token" | "comment" | "post" | "user" | "user_like";

export type NexusGenInputNames = "comment_input" | "post_input" | "user_input" | "user_like_input";

export type NexusGenEnumNames = "like_types";

export type NexusGenInterfaceNames = "base" | "likable_content";

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = "like_types_union";

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}