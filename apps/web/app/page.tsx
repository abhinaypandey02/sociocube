import { Button } from "ui/button";
import { getServerToken } from "../lib/auth-server";
import { queryGQL } from "../lib/apollo-server";
import { GET_CURRENT_USER } from "../lib/queries";
import Logout from "./logout";

async function Page() {
  const token = await getServerToken();
  const data = token ? await queryGQL(GET_CURRENT_USER, {}, token) : null;
  return (
    <main>
      Current user email : {data?.getCurrentUser.email} {token}
      <Button />
      {token ? <Logout /> : null}
    </main>
  );
}
export default Page;
