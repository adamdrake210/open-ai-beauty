import { GetServerSidePropsContext } from "next";

import { userFromRequest } from "@/utils/tokens";
import { LOGIN } from "@/constants/routeConstants";

export async function ensureAuth(ctx: GetServerSidePropsContext) {
  const data = await userFromRequest(ctx.req);

  if (!data?.userId) {
    ctx.res.statusCode = 403;
    return {
      redirect: {
        destination: LOGIN,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        userId: data?.userId,
      },
    };
  }
}
