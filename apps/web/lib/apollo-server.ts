import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  type OperationVariables,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import type { GraphQLFormattedError } from "graphql/error";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const { query } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
    }),
  });
});

function checkErrors(errors?: readonly GraphQLFormattedError[]) {
  if (errors && errors.length > 0)
    throw new Error(errors.map((e) => e.message).join(" | "));
}

export async function queryGQL<T, V extends OperationVariables>(
  _query: TypedDocumentNode<T, V>,
  variables?: V,
  token?: string | null,
): Promise<T> {
  const res = await query({
    query: _query,
    variables,
    context: {
      headers: {
        authorization: `Bearer ${token || null}`,
      },
    },
  });
  checkErrors(res.errors);
  return res.data;
}
