/* eslint-disable */
import * as types from './graphql';
import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation UpdateOnboardingBasicDetails($data: UpdateBasicDetailsArgs!) {\n    updateOnboardingBasicDetails(data: $data)\n  }\n": types.UpdateOnboardingBasicDetailsDocument,
    "\n  #graphql\n  mutation CompleteOnboarding {\n    completeOnboarding\n  }\n": types.CompleteOnboardingDocument,
    "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      email\n      name\n      photo\n      isOnboarded\n      scopes\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      email\n      name\n      photo\n      isOnboarded\n      scopes\n      bio\n      onboardingData {\n        name\n        photo\n        bio\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n": types.GetDefaultOnboardingDetailsDocument,
    "\n  #graphql\n  query GetFeaturedSellers {\n    getFeaturedSellers {\n      id\n      name\n      photo\n      bio\n    }\n  }\n": types.GetFeaturedSellersDocument,
    "\n  #graphql\n  query GetSeller($id: Int!) {\n    getSeller(id: $id) {\n      name\n      photo\n      bio\n    }\n  }\n": types.GetSellerDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateOnboardingBasicDetails($data: UpdateBasicDetailsArgs!) {\n    updateOnboardingBasicDetails(data: $data)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateOnboardingBasicDetails($data: UpdateBasicDetailsArgs!) {\n    updateOnboardingBasicDetails(data: $data)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation CompleteOnboarding {\n    completeOnboarding\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CompleteOnboarding {\n    completeOnboarding\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      email\n      name\n      photo\n      isOnboarded\n      scopes\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUser {\n    getCurrentUser {\n      email\n      name\n      photo\n      isOnboarded\n      scopes\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      email\n      name\n      photo\n      isOnboarded\n      scopes\n      bio\n      onboardingData {\n        name\n        photo\n        bio\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      email\n      name\n      photo\n      isOnboarded\n      scopes\n      bio\n      onboardingData {\n        name\n        photo\n        bio\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetFeaturedSellers {\n    getFeaturedSellers {\n      id\n      name\n      photo\n      bio\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetFeaturedSellers {\n    getFeaturedSellers {\n      id\n      name\n      photo\n      bio\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetSeller($id: Int!) {\n    getSeller(id: $id) {\n      name\n      photo\n      bio\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetSeller($id: Int!) {\n    getSeller(id: $id) {\n      name\n      photo\n      bio\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;