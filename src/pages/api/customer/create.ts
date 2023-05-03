import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { name, email } = req.body;
  const userExists = await prisma.customer.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).json({
      message: "Username already exists",
    });
  }

  const user = await prisma.customer.create({
    data: {
      name,
      email,
    },
  });

  return res.status(201).json(user);
}
