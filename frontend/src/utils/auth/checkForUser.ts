import { GetServerSidePropsContext } from "next";
import { userFromRequest } from "../tokens";

export async function checkForUser(ctx: GetServerSidePropsContext) {
  const data = await userFromRequest(ctx.req);

  if (!data?.userId) {
    return {
      props: {
        userId: null,
      },
    };
  }

  return {
    props: {
      userId: data?.userId,
    },
  };
}
