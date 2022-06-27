// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import filenamifyUrl from 'filenamify-url';

type Data = {
    url: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (!(req.method === 'POST' || req.body)) res.status(400);

    const { href } = JSON.parse(req.body);
    const url = filenamifyUrl(href);
    res.json({ url });
}
