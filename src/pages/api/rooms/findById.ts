import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            console.log(req.query.roomId)
            const data = await axios.get(`${process.env.NODE_LOCAL_SERVER}/rooms/${req.query.roomId}`, {
                headers: {
                    'X-XRCLOUD-PROJECT-ID': req.headers['x-xrcloud-project-id'],
                    Authorization: req.headers.authorization
                }
            })
            res.status(data.status).send(data.data)
        } catch (e: any) {
            res.status(e.response.data.statusCode).send(e.response.data.message)
        }
    } else {
        res.status(500).send('Wrong method')
    }
}
