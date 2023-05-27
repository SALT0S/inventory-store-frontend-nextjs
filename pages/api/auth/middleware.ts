import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const middleware = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});

  if (!session) {
    return res.status(401).json({error: "Unauthorized"});
  } else {
    return res.status(200).json({message: "Authorized"});
  }
};
