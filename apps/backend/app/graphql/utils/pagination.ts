import { Field, InputType } from "type-graphql";
import { PgSelect } from "drizzle-orm/pg-core";
import { MaxLength } from "class-validator";

@InputType()
export class PaginationArgs {
  @MaxLength(20)
  @Field({ defaultValue: 10 })
  pageSize: number;
  @Field({ defaultValue: 1 })
  page: number;
}

export function withPagination<T extends PgSelect>(
  qb: T,
  { page, pageSize }: PaginationArgs,
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}
