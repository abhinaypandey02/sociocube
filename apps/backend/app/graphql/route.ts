import "reflect-metadata";
import type { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { authChecker, AuthorizedContext, Context, context } from "./context";
import { UserResolvers } from "./types/User/resolvers";
import { ChatResolvers } from "./types/Chat/resolvers";
import { MapResolvers } from "./types/Map/resolvers";
import { PostingResolvers } from "./types/Posting/resolvers";

const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
  resolvers: [
    ...UserResolvers,
    ...ChatResolvers,
    ...MapResolvers,
    ...PostingResolvers,
  ],
  authChecker,
  validate: true,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    process.env.NEXT_PUBLIC_DEVELOPMENT
      ? ApolloServerPluginLandingPageLocalDefault()
      : ApolloServerPluginLandingPageProductionDefault(),
    {
      // eslint-disable-next-line @typescript-eslint/require-await -- No async required
      async requestDidStart({ request, contextValue }) {
        if (
          (contextValue as AuthorizedContext).onlyQuery &&
          !request.query?.startsWith("query")
        )
          (contextValue as Context).userId = null;
      },
    },
  ],
  introspection: true,
  status400ForVariableCoercionErrors: true,
});
const handler = startServerAndCreateNextHandler(server, {
  context: (req: NextRequest) =>
    new Promise((resolve) => {
      resolve(context(req));
    }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
