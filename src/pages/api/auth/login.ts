import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body
            const response = await axios.post(`TODO: LOGIN PROCESS ENV`, { email, password })
            res.status(response.status).send(response.data)
        } catch (e: any) {
            res.status(e.response.data.statusCode).send(e.response.data.message)
        }
    } else {
        res.status(405).send('Wrong method')
    }
}
