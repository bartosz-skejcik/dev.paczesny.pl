import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "utils/sanity";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { collection } = req.query;
    let data = [];

    switch (collection) {
        case "projects":
            data = await client.fetch(`*[_type == "${collection}"]{
                ...,
                technologies[]->
            } | order(order)`);
            res.status(200).json(data);
            break;
        case "education":
            // sort by year descending
            data = await client.fetch(
                `*[_type == "${collection}"] | order(date asc)`
            );
            res.status(200).json(data);
            break;
        default:
            data = await client.fetch(`*[_type == "${collection}"]`);
            res.status(200).json(data);
            break;
    }
}
