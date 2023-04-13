import type { NextApiRequest, NextApiResponse } from "next";
import mailgun from "mailgun-js";

type Data = {};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { name, email, message } = req.body;

    try {
        const mg = mailgun({
            apiKey: process.env.MAILGUN_API_KEY || "",
            domain: process.env.MAILGUN_DOMAIN || "",
        });

        const data = {
            from: `${name} <${email}>`,
            to: process.env.MAILGUN_TO || "",
            subject: "Kontakt",
            text: message,
        };

        mg.messages().send(data, function (error: any, body: any) {
            if (error) {
                console.error(error);
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            } else {
                console.log(body);
                res.status(200).json({
                    success: true,
                    message: "Wiadomość została wysłana",
                });
            }
        });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
}
