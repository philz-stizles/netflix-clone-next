// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/libs/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

type ResponseData = {
  status: boolean;
  data: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res
        .status(422)
        .json({ status: false, data: null, message: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res
      .status(200)
      .json({ status: true, data: user, message: "Registration successful" });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    return res.status(400).json({
      status: false,
      data: null,
      message: `Something went wrong`,
    });
  }
}
