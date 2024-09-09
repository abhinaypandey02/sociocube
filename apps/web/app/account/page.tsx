import React from "react";
import { getServerToken } from "../../lib/auth-server";
import Logout from "../logout";

export default async function Page() {
  const token = await getServerToken();

  return <div>{token ? <Logout /> : null}</div>;
}
