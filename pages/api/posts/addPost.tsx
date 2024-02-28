import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { Prisma } from "@prisma/client";
type Data = {
  name: string;
};

// Handler that contains a request and response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // This is pretty straightforward.
  // You make a request and catch it here.
  // Then you validate the data and make a response to send back
  if (req.method === "POST") {
    const sessionInfo = await getServerSession(req, res, authOptions);

    // No User Signed In'

    if (!sessionInfo)
      return res.status(401).json({ message: "Please sign in to make a post" });

    const title: string = req.body.title;

    if (title.length > 300)
      return res
        .status(403)
        .json({ message: "Please write a shorter message." });
    // If the message is empty
    if (title.length)
      return res.status(403).json({ message: "Please enter a message." });

    // create a post
    try {
      const resut;
    } catch (err) {}
    console.log(title);
  }
}
