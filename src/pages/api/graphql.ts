import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { connectDB } from './utils/connectDb'
import { context } from "./utils/context";

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

connectDB();
const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};