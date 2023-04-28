import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const { currentUser } = await serverAuth(req, res);

      const favorites = await prisma.movie.findMany({
        where: { 
          id: {
            in: currentUser?.favoriteIds
          }
        },
      });


      return res.status(200).json(favorites);
    }

    if (req.method === "PUT") {
      console.log("FAVORITE PUT!!!!!");
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prisma.movie.findUnique({
        where: { id: movieId },
      });
      if (!existingMovie) {
        throw new Error("Movie was not found");
      }

      const updatedUser = await prisma.user.update({
        where: {
          // id: currentUser.id
          email: currentUser.email as string,
        },
        data: {
          favoriteIds: {
            push: existingMovie.id,
          },
        },
      });

      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
