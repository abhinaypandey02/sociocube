import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  type OperationVariables,
} from "@apollo/client";
import type { PreloadQueryProps } from "@apollo/experimental-nextjs-app-support";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import type { GraphQLFormattedError } from "graphql/error";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import type { FC } from "react";

export const { query, PreloadQuery: PreloadQueryInternal } =
  registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
        credentials: "include",
      }),
    });
  });

export async function Injector<T, Y>({
  fetch,
  Component,
  props,
}: {
  fetch: () => Promise<T>;
  Component: FC<{ data: T }>;
  props?: Y;
}) {
  const data = await fetch();
  return <Component {...(props || {})} data={data} />;
}

export async function PreloadQuery<
  TData,
  TVariables extends OperationVariables,
>(
  props: PreloadQueryProps<TData, TVariables> & {
    revalidate?: number;
    sendCookies?: boolean;
  },
) {
  return (
    <PreloadQueryInternal
      context={{
        headers: {
          Cookie: props.sendCookies ? await cookies() : undefined,
        },
        fetchOptions: {
          cache:
            props.revalidate === undefined && !props.sendCookies
              ? "force-cache"
              : undefined,
          next: {
            revalidate: props.revalidate,
          },
        },
      }}
      {...props}
    />
  );
}

function checkErrors(errors?: readonly GraphQLFormattedError[]) {
  if (errors && errors.length > 0)
    throw new Error(errors.map((e) => e.message).join(" | "));
}

export async function queryGQL<T, V extends OperationVariables>(
  _query: TypedDocumentNode<T, V>,
  variables?: V,
  Cookie?: ReadonlyRequestCookies,
  revalidate?: number,
): Promise<T> {
  const res = await query({
    query: _query,
    variables,
    context: {
      headers: {
        Cookie,
      },
      fetchOptions: {
        cache: !revalidate ? "force-cache" : undefined,
        next: {
          revalidate,
        },
      },
    },
  });
  checkErrors(res.errors);
  return res.data;
}
