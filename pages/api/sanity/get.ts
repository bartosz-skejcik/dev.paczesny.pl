import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/sanity";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { collection } = req.query;

    const data = await client.fetch(`*[_type == "${collection}"]`);

    res.status(200).json(data);
}
