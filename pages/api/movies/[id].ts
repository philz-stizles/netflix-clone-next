import prisma from "@/libs/prisma";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { id } = req.query;

    await serverAuth(req, res);

    if (!id) {
      throw new Error("Missing Id");
    }

    if (typeof id !== "string") {
      throw new Error("Invalid Id");
    }

    const movies = await prisma.movie.findUnique({
      where: { id },
    });

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
