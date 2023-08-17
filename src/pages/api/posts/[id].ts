// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { postDetailQuery } from '../../../../utils/queries';
import { client } from '../../../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      const query = postDetailQuery(id as string);

      const data = await client.fetch(query);

      res.status(200).json(data[0]);
    }
  } catch (error) {
    console.error(error);
  }
}
