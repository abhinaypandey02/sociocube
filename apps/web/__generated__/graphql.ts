/* eslint-disable */
import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum AuthScopes {
  Email = 'EMAIL',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
  Phone = 'PHONE'
}

export type File = {
  __typename?: 'File';
  uploadURL: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completeOnboarding: Scalars['Boolean']['output'];
  updateOnboardingBasicDetails: Scalars['Boolean']['output'];
};


export type MutationUpdateOnboardingBasicDetailsArgs = {
  data: UpdateBasicDetailsArgs;
};

export type OnboardingData = {
  __typename?: 'OnboardingData';
  name?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getCurrentUser: User;
  getFeaturedSellers: Array<User>;
};

export enum Roles {
  Seller = 'SELLER'
}

export type UpdateBasicDetailsArgs = {
  imageURL?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  companyName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  isOnboarded?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onboardingData?: Maybe<OnboardingData>;
  phone?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  pictureUploadURL: File;
  roles?: Maybe<Array<Roles>>;
  scopes: Array<AuthScopes>;
};

export type UpdateOnboardingBasicDetailsMutationVariables = Exact<{
  data: UpdateBasicDetailsArgs;
}>;


export type UpdateOnboardingBasicDetailsMutation = { __typename?: 'Mutation', updateOnboardingBasicDetails: boolean };

export type CompleteOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOnboardingMutation = { __typename?: 'Mutation', completeOnboarding: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', email?: string | null, name?: string | null, photo?: string | null, isOnboarded?: boolean | null, scopes: Array<AuthScopes> } };

export type GetDefaultOnboardingDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultOnboardingDetailsQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', email?: string | null, name?: string | null, photo?: string | null, isOnboarded?: boolean | null, scopes: Array<AuthScopes>, onboardingData?: { __typename?: 'OnboardingData', name?: string | null, photo?: string | null } | null } };

export type GetFeaturedSellersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturedSellersQuery = { __typename?: 'Query', getFeaturedSellers: Array<{ __typename?: 'User', name?: string | null, photo?: string | null }> };


export const UpdateOnboardingBasicDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingBasicDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBasicDetailsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingBasicDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingBasicDetailsMutation, UpdateOnboardingBasicDetailsMutationVariables>;
export const CompleteOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteOnboarding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeOnboarding"}}]}}]} as unknown as DocumentNode<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"scopes"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetDefaultOnboardingDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultOnboardingDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"scopes"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultOnboardingDetailsQuery, GetDefaultOnboardingDetailsQueryVariables>;
export const GetFeaturedSellersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]}}]} as unknown as DocumentNode<GetFeaturedSellersQuery, GetFeaturedSellersQueryVariables>;