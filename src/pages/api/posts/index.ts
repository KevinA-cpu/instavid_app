// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { allPostsQuery } from "../../../../utils/queries";
import { client } from "../../../../utils/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const query = allPostsQuery();

      const data = await client.fetch(query).then((res) => res);
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
  }
}
