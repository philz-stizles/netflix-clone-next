import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prisma';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    const updatedFavorites = currentUser?.favoriteIds.filter(favoriteId => favoriteId !== favoriteId);

    await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data:{ favoriteIds: updatedFavorites}
    });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}