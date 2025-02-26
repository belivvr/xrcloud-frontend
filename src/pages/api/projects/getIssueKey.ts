import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PATCH') {
        try {
            const data = await axios.patch(
                `${process.env.NODE_LOCAL_SERVER}/projects/${req.body.projectId}/generate-key`,
                {},
                {
                    headers: {
                        Authorization: req.headers.authorization
                    }
                }
            )
            res.status(data.status).send(data.data)
        } catch (e: any) {
            res.status(e.response.data.statusCode).send(e.response.data.message)
        }
    } else {
        res.status(500).send('Wrong method')
    }
}
