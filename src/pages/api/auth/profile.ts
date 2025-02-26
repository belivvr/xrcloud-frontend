import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const data = await axios.get(`${process.env.NODE_LOCAL_SERVER}/auth/profile`, {
                headers: {
                    Authorization: req.headers.authorization
                }
            })
            return res.status(data.status).send(data.data)
        } catch (e: any) {
            return res.status(e.response.data.statusCode).send(e.response.data.message)
        }
    } else {
        return res.status(500).send('Wrong method')
    }
}
