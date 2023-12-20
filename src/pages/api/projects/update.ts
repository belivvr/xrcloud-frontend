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
                const id = fields.projectId as string
                const name = fields.projectName as string
                const webhookUrl = fields.webhookUrl as string
                const favicon = files.favicon as any
                const logo = files.logo as any

                data.id = id
                data.name = name
                data.webhookUrl = webhookUrl
                data.favicon = favicon
                data.logo = logo

                return resolve(data)
            })
        })

        const formData = new FormData()

        const id = fileData.id
        const name = fileData.name
        const webhookUrl = fileData.webhookUrl
        const favicon = fileData.favicon
        const logo = fileData.logo

        formData.append('name', name)

        if (webhookUrl) formData.append('webhookUrl', webhookUrl)

        if (favicon) {
            const faviconFilepath = favicon.filepath
            const faviconStats = fs.statSync(faviconFilepath)
            const faviconFileSizeInBytes = faviconStats.size
            const faviconFileStream = fs.createReadStream(faviconFilepath)
            formData.append(`favicon`, faviconFileStream, { knownLength: faviconFileSizeInBytes })
        }

        if (logo) {
            const logoFilepath = logo.filepath
            const logoStats = fs.statSync(logoFilepath)
            const logoFileSizeInBytes = logoStats.size
            const logoFileStream = fs.createReadStream(logoFilepath)
            formData.append(`logo`, logoFileStream, { knownLength: logoFileSizeInBytes })
        }

        const api = await fetch(`${process.env.NODE_LOCAL_SERVER}/api/projects/${id}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                authorization: req.headers.authorization || ''
            }
        })

        const status = api.status
        const data = (await api.json()) as any

        if (status === 200) {
            return res.status(status).json({ success: true })
        } else {
            throw res.status(status).json(data)
        }
    } else {
        res.status(500).send('Wrong method')
    }
}
