import type { NextApiRequest, NextApiResponse } from "next";
import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY || "",
    apiSecret: process.env.MAILJET_API_SECRET || "",
});

type Data = {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { name, email, message } = req.body;

    const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
            {
                From: {
                    Email: "bartek@paczesny.pl",
                    Name: name,
                },
                To: [
                    {
                        Email: "bartek@paczesny.pl",
                        Name: "Bartek Paczesny",
                    },
                ],
                Subject: "Kontakt",
                TextPart: email + " " + message,
            },
        ],
    });
    request
        .then((result: any) => {
            res.status(200).json({
                success: true,
                message: "Wiadomość została wysłana",
            });
        })
        .catch((err: any) => {
            res.status(500).json({ success: false, message: err.message });
        });
}
