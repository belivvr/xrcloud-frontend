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
    if (req.method === 'POST') {
        const fileData: any = await new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm({
                multiples: true,
                maxFileSize: 200 * 1024 * 1024,
                keepExtensions: true
            })
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err)

                let data: any = {}
                const name = fields.projectName as string

                const webhookUrl = fields.webhookUrl as string

                const favicon = files.favicon as any
                const logo = files.logo as any

                data.name = name
                data.favicon = favicon
                data.logo = logo
                data.webhookUrl = webhookUrl

                return resolve(data)
            })
        })

        const formData = new FormData()

        const name = fileData.name

        const webhookUrl = fileData.webhookUrl

        const favicon = fileData.favicon
        const logo = fileData.logo

        formData.append('name', name)

        if (webhookUrl) formData.append('webhookUrl', webhookUrl)

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

        const api = await fetch(`${process.env.NODE_LOCAL_SERVER}/api/projects`, {
            method: 'POST',
            body: formData,
            headers: {
                authorization: req.headers.authorization || ''
            }
        })

        const status = api.status
        const data = (await api.json()) as any

        if (status === 201) {
            return res.status(status).send(data)
        } else {
            throw res.status(status).send(data)
        }
    } else {
        res.status(500).send('Wrong method')
    }
}
