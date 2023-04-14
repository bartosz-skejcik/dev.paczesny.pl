import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).end();
        return;
    }

    const status = await fs.promises.readFile(
        `${process.cwd()}/status.txt`,
        "utf-8"
    );

    status === "offline"
        ? res.status(503).json({
              status,
          })
        : res.status(200).json({
              status,
          });
}
