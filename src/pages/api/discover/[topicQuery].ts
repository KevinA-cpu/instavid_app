// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { topicPostsQuery } from '../../../../utils/queries';
import { client } from '../../../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const { topicQuery } = req.query;
      const videosQuery = topicPostsQuery(topicQuery as string);
      const video = await client.fetch(videosQuery);
      res.status(200).json(video);
    }
  } catch (error) {
    console.error(error);
  }
}
