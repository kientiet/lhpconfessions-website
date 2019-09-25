import {makeExecutableSchema} from "graphql-tools";
import resolvers from "./resolvers";

const typeDefs = `
type confessionQueryType {
    _id: String
    id: String
    status_id: String
    status_message: String
    link_name: String
    status_type: String
    status_link: String
    status_published: String
    num_reactions: Int
    num_comments: Int
    num_shares: Int
    num_likes: Int
    num_loves: Int
    num_wows: Int
    num_hahas: Int
    num_sads: Int
    num_angrys: Int
    type: String
}

type gossipQueryType {
    _id: String
    id: String
    status_message: String
    status_published: String
    userId: String
    num_likes: Int
    num_reactions: Int
    num_shares: Int
    num_comments: Int
    type: String
}

type commentQueryType {
    _id: String
    userId: String
    status_id: String
    comment_message: String
    comment_published: String
    status: String
    AdminId: String
}

type Query {
    confessionList: [confessionQueryType]
    confessionWithId(statusId: String!): confessionQueryType
    userConfessions(userId: String!): [confessionQueryType]
    confessionPending(userId: String!, pendingConfessionsId: [String]!): [confessionQueryType]
    gossipFeed(userId: String!, finalDate: String!): [gossipQueryType]
    gossipWithId(statusId: String!): gossipQueryType
    commentWithStatusId(statusId: String!, loadedCommentsId: [String]!): [commentQueryType]
}

type Mutation {
    addConfession(newPost: String!, newTitle: String!): [confessionQueryType]
    addGossip(newPost: String!, userId: String!): [gossipQueryType]
    addComment(newComment: String!, userId: String!, statusId: String!): [commentQueryType]
    updateConfessionStatus(adminId: String!, postId: String!, status: String!): [confessionQueryType]
}

`;

export default makeExecutableSchema({typeDefs, resolvers});
