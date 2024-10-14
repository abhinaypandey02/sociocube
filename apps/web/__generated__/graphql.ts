/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export enum AuthScopes {
  Email = 'EMAIL',
  Google = 'GOOGLE',
  Instagram = 'INSTAGRAM',
  Phone = 'PHONE'
}

export type Chat = {
  __typename?: 'Chat';
  conversation: Scalars['Int']['output'];
  hasRead: Scalars['Boolean']['output'];
  messages: Array<Message>;
  preview: Scalars['String']['output'];
  with: User;
};


export type ChatMessagesArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type InstagramMedia = {
  __typename?: 'InstagramMedia';
  caption: Scalars['String']['output'];
  comments: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
  link: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  type: InstagramMediaType;
};

export enum InstagramMediaType {
  Feed = 'FEED',
  Reel = 'REEL'
}

export type InstagramStats = {
  __typename?: 'InstagramStats';
  followers: Scalars['Int']['output'];
  mediaCount: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String']['output'];
  sender: Scalars['Int']['output'];
  sentAt: Scalars['DateTimeISO']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completeOnboarding: Scalars['Boolean']['output'];
  readMessage: Scalars['Boolean']['output'];
  sendMessage: Scalars['Boolean']['output'];
  updateOnboardingBasicDetails: Scalars['Boolean']['output'];
  updateUser: Scalars['Boolean']['output'];
};


export type MutationReadMessageArgs = {
  conversation: Scalars['Int']['input'];
};


export type MutationSendMessageArgs = {
  data: SendMessage;
};


export type MutationUpdateOnboardingBasicDetailsArgs = {
  data: UpdateBasicDetailsArgs;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserArgs;
};

export type OnboardingData = {
  __typename?: 'OnboardingData';
  bio?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getChat?: Maybe<Chat>;
  getChats: Array<Chat>;
  getCurrentUser: User;
  getFeaturedSellers: Array<User>;
  getSeller?: Maybe<User>;
};


export type QueryGetChatArgs = {
  user: Scalars['Int']['input'];
};


export type QueryGetSellerArgs = {
  id: Scalars['Int']['input'];
};

export enum Roles {
  Seller = 'SELLER'
}

export type SendMessage = {
  body: Scalars['String']['input'];
  conversation: Scalars['Int']['input'];
};

export type StorageFile = {
  __typename?: 'StorageFile';
  uploadURL: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UpdateBasicDetailsArgs = {
  bio: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateUserArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  instagramMedia?: Maybe<Array<InstagramMedia>>;
  instagramStats?: Maybe<InstagramStats>;
  isOnboarded?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onboardingData?: Maybe<OnboardingData>;
  phone?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  pictureUploadURL: StorageFile;
  roles?: Maybe<Array<Roles>>;
  scopes: Array<AuthScopes>;
};

export type UpdateOnboardingBasicDetailsMutationVariables = Exact<{
  data: UpdateBasicDetailsArgs;
}>;


export type UpdateOnboardingBasicDetailsMutation = { __typename?: 'Mutation', updateOnboardingBasicDetails: boolean };

export type CompleteOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOnboardingMutation = { __typename?: 'Mutation', completeOnboarding: boolean };

export type ReadMessageMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ReadMessageMutation = { __typename?: 'Mutation', readMessage: boolean };

export type SendChatMutationVariables = Exact<{
  data: SendMessage;
}>;


export type SendChatMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserArgs;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, email?: string | null, name?: string | null, photo?: string | null, isOnboarded?: boolean | null, scopes: Array<AuthScopes> } };

export type GetDefaultOnboardingDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultOnboardingDetailsQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', email?: string | null, name?: string | null, photo?: string | null, isOnboarded?: boolean | null, scopes: Array<AuthScopes>, bio?: string | null, onboardingData?: { __typename?: 'OnboardingData', name?: string | null, photo?: string | null, bio?: string | null } | null, pictureUploadURL: { __typename?: 'StorageFile', uploadURL: string, url: string } } };

export type GetFeaturedSellersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturedSellersQuery = { __typename?: 'Query', sellers: Array<{ __typename?: 'User', id: number, name?: string | null, photo?: string | null, bio?: string | null, instagramStats?: { __typename?: 'InstagramStats', username: string, followers: number } | null }> };

export type GetSellerQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSellerQuery = { __typename?: 'Query', getSeller?: { __typename?: 'User', name?: string | null, photo?: string | null, bio?: string | null, instagramMedia?: Array<{ __typename?: 'InstagramMedia', thumbnail: string, caption: string, link: string }> | null, instagramStats?: { __typename?: 'InstagramStats', followers: number, mediaCount: number, username: string } | null } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', preview: string, conversation: number, hasRead: boolean, with: { __typename?: 'User', id: number, name?: string | null, photo?: string | null } }> };

export type GetChatQueryVariables = Exact<{
  userid: Scalars['Int']['input'];
}>;


export type GetChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Chat', conversation: number, hasRead: boolean, with: { __typename?: 'User', id: number, name?: string | null, photo?: string | null }, messages: Array<{ __typename?: 'Message', body: string, sentAt: any, sender: number }> } | null };

export type GetAccountDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountDetailsQuery = { __typename?: 'Query', user: { __typename?: 'User', name?: string | null, bio?: string | null, photo?: string | null, pictureUploadURL: { __typename?: 'StorageFile', uploadURL: string, url: string } } };


export const UpdateOnboardingBasicDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingBasicDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBasicDetailsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingBasicDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingBasicDetailsMutation, UpdateOnboardingBasicDetailsMutationVariables>;
export const CompleteOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteOnboarding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeOnboarding"}}]}}]} as unknown as DocumentNode<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>;
export const ReadMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReadMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<ReadMessageMutation, ReadMessageMutationVariables>;
export const SendChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessage"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<SendChatMutation, SendChatMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"scopes"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetDefaultOnboardingDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultOnboardingDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"scopes"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pictureUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultOnboardingDetailsQuery, GetDefaultOnboardingDetailsQueryVariables>;
export const GetFeaturedSellersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sellers"},"name":{"kind":"Name","value":"getFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}}]}}]}}]}}]} as unknown as DocumentNode<GetFeaturedSellersQuery, GetFeaturedSellersQueryVariables>;
export const GetSellerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeller"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSeller"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"instagramMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetSellerQuery, GetSellerQueryVariables>;
export const GetChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"chats"},"name":{"kind":"Name","value":"getChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"conversation"}},{"kind":"Field","name":{"kind":"Name","value":"with"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}}]}}]}}]} as unknown as DocumentNode<GetChatsQuery, GetChatsQueryVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"chat"},"name":{"kind":"Name","value":"getChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"with"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"conversation"}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"sentAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>;
export const GetAccountDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountDetailsQuery, GetAccountDetailsQueryVariables>;