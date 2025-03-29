import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/graphql`,
  documents: ["./app/**/*.ts*", "./components/**/*.ts*", "./lib/**/*.ts*"],
  generates: {
    "./__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./__generated__/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
        includeIntrospectionTypes: true,
        commentDescriptions: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
