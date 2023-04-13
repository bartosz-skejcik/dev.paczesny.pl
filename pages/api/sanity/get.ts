import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "utils/sanity";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { collection } = req.query;

    if (collection === "projects") {
        const data = await client.fetch(`*[_type == "${collection}"]{
            ...,
            technologies[]->
        }`);
        res.status(200).json(data);
    } else {
        const data = await client.fetch(`*[_type == "${collection}"]`);
        res.status(200).json(data);
    }
}
