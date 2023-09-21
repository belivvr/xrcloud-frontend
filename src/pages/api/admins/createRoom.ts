import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = await axios.post(
                `${process.env.NODE_LOCAL_SERVER}/console/rooms`,
                {
                    sceneId: req.body.sceneId,
                    projectId: req.headers['x-xrcloud-project-id'],
                    name: req.body.name,
                    size: req.body.size,
                    returnUrl: req.body.returnUrl
                },
                {
                    headers: {
                        Authorization: req.headers.authorization
                    }
                }
            )
            res.status(data.status).send(data.data)
        } catch (e: any) {
            console.log(e.response.data)
            res.status(e.response.data.statusCode).send(e.response.data.message)
        }
    } else {
        res.status(500).send('Wrong method')
    }
}
