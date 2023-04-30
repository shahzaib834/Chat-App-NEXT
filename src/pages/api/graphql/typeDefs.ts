import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
     id: String
     name: String
     email: String
     password: String
     picture: String
  }

  type Chat {
    isGroupChat: Boolean
    chatName: String
    users: [User]
    latestMessage: [Chat]
    groupAdmin: User
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    picture: String
  }

  input ChatInput {
    isGroupChat: Boolean!
    chatName: String!
    ids: [String]!
    latestMessage: [ChatInput]
    groupAdmin: [UserInput]
  }

  type SignInResponse {
    token: String
    user: User
    error: String
  }

  type SignUpResponse {
    token: String
    user: User
    error: String
  }

  type Query {
    getUsers: [User]
    getUser(id: ID): User
    getChat(id: ID): Chat
  }

  type Mutation {
    signIn(email: String!, password: String!): SignInResponse
    signUp(input: UserInput): SignUpResponse
    accessChat(input: ChatInput): Chat
    fetchChats: [Chat]
    createGroupChat(chatName: String!, usersEmails: [String]!): Chat
    renameGroup(chatId: ID!, chatName: String!): Chat
    addToGroup(chatId: ID!, userId: ID!): Chat
    removeFromGroup(chatId: ID!, userId: ID!): Chat
  }
`;