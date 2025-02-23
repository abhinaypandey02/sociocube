import { Field, InputType } from "type-graphql";
import { MaxLength } from "class-validator";

@InputType("PaginationArgs")
export class PaginationArgs {
  @MaxLength(20)
  @Field({ defaultValue: 10 })
  pageSize: number;
  @Field({ defaultValue: 1 })
  page: number;
}

export function withPagination<
  T extends {
    limit: (x: number) => {
      offset: (x: number) => unknown;
    };
  },
>(qb: T, { page, pageSize }: PaginationArgs) {
  return qb.limit(pageSize).offset((page - 1) * pageSize) as Omit<
    T,
    "limit" | "offset"
  >;
}
