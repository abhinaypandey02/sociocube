import { Button } from "ui/button";
import { getServerToken } from "../lib/auth-server";
import { ROUTES } from "../constants/routes";
import { queryGQL } from "../lib/apollo-server";
import { GET_CURRENT_USER } from "../lib/queries";
import Logout from "./logout";
import ClientTest from "./client-test";

async function Page() {
  const token = await getServerToken();
  const data = token ? await queryGQL(GET_CURRENT_USER, {}, token) : null;
  return (
    <main>
      Current user email : {data?.getCurrentUser.email}
      {token ? <ClientTest /> : null}
      <Button />
      {!token && (
        <>
          <a href={ROUTES.SIGNUP}>Sign up</a>
          <a href={ROUTES.LOGIN}>Login</a>
        </>
      )}
      {token ? <Logout /> : null}
    </main>
  );
}
export default Page;
