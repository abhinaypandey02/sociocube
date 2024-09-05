"use client";

import {
  HttpLink,
  type OperationVariables,
  useApolloClient,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import type { PropsWithChildren } from "react";
import React, { useCallback } from "react";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { GraphQLFormattedError } from "graphql/error";
import { useToken } from "./auth-client";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
    }),
  });
}

export function ApolloWrapper({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

export const tokenContext = (token?: string | null) => {
  if (!token) return undefined;
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

function checkErrors(errors?: readonly GraphQLFormattedError[]) {
  if (errors && errors.length > 0)
    throw new Error(errors.map((e) => e.message).join(" | "));
}

export function useAuthQuery() {
  const token = useToken();
  const client = useApolloClient();
  return useCallback(
    async <T, V extends OperationVariables>(
      query: TypedDocumentNode<T, V>,
      variables?: V,
    ) => {
      const res = await client.query({
        query,
        variables,
        context: tokenContext(token),
      });
      checkErrors(res.errors);
      return res.data;
    },
    [client, token],
  );
}

export function useAuthMutation() {
  const token = useToken();
  const client = useApolloClient();
  return useCallback(
    async <T, V extends OperationVariables>(
      mutation: TypedDocumentNode<T, V>,
      variables?: V,
    ) => {
      const res = await client.mutate({
        mutation,
        variables,
        context: tokenContext(token),
      });
      checkErrors(res.errors);
      return res.data;
    },
    [client, token],
  );
}
