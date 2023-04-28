import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prisma';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    if (req.method === 'DELETE') {
      console.log("FAVORITE DELETE!!!!!");
        const { currentUser } = await serverAuth(req, res);

        const { movieId } = req.query
        if (!movieId || typeof movieId !== 'string') {
          throw new Error("Movie was not found");
        }
        console.log(movieId)

        const existingMovie = await prisma.movie.findUnique({ where: { id: movieId}})
        if (!existingMovie) {
          throw new Error("Movie was not found");
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
                // email: currentUser.email as string
            },
            data:{ favoriteIds:  currentUser.favoriteIds.filter( favoriteId => favoriteId !== movieId)}
        });

        return res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}