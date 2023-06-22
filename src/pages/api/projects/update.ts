import formidable from 'formidable'
import FormData from 'form-data'
import fs from 'fs'
import fetch from 'node-fetch'

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req: any, res: any) {
    if (req.method === 'PATCH') {
        const fileData: any = await new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm({
                multiples: true,
                maxFileSize: 200 * 1024 * 1024,
                keepExtensions: true
            })
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err)
                let data: any = {}
                const projectId = fields.projectId as string
                const name = fields.name as string
                const description = fields.description as string
                const favicon = fields.favicon as any
                const logo = fields.logo as any

                data.projectId = projectId
                data.name = name
                data.description = description
                data.favicon = favicon
                data.logo = logo

                return resolve(data)
            })
        })

        const formData = new FormData()

        const projectId = fileData.projectId
        const name = fileData.name
        const description = fileData.description
        const favicon = fileData.favicon
        const logo = fileData.logo

        formData.append('name', name)
        formData.append('description', description)

        const faviconFilepath = favicon.filepath
        const faviconStats = fs.statSync(faviconFilepath)
        const faviconFileSizeInBytes = faviconStats.size
        const faviconFileStream = fs.createReadStream(faviconFilepath)
        formData.append(`favicon`, faviconFileStream, { knownLength: faviconFileSizeInBytes })

        const logoFilepath = logo.filepath
        const logoStats = fs.statSync(logoFilepath)
        const logoFileSizeInBytes = logoStats.size
        const logoFileStream = fs.createReadStream(logoFilepath)
        formData.append(`logo`, logoFileStream, { knownLength: logoFileSizeInBytes })

        const api = await fetch(`${process.env.NODE_PRODUCTION_SERVER}/projects/${projectId}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                authorization: req.headers.authorization || ''
            }
        })

        const status = api.status
        const data = (await api.json()) as any

        // 성공시, 실패시
        if (status === 201) {
            return res.status(status).json({ success: true })
        } else {
            throw res.status(data.statusCode).json(data)
        }
    } else {
        res.status(500).send('Wrong method')
    }
}
