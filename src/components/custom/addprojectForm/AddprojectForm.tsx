import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableRow, TableCell, SelectChangeEvent } from '@mui/material'
import { useProject } from 'hooks/api/useProject'
import { SelectProducts } from '.'
import router from 'next/router'
import { CancelButton } from '../common/CancelButton'
import { DefaultButton } from '../common/DefaultButton'
import { InputFiles, InputName } from '../common'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { InputURL } from '../common/InputURL'

export const AddProjectForm = () => {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const [productName, setProductName] = useState<string>('hubs')
    const [projectName, setProjectName] = useState<string>('')
    const [webhookURL, setWebhookURL] = useState<string | null>(null)

    const [faviconThumbnailUrl, setFaviconThumbnailUrl] = useState('')
    const [faviconFile, setFaviconFile] = useState<File | undefined>(undefined)

    const [logoThumbnailUrl, setLogoThumbnailUrl] = useState('')
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined)
    const { createsProject, projectList } = useProject()

    const selectProduct = (event: SelectChangeEvent) => {
        setProductName(event.target.value)
    }

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (loading) setLoading(false)
    }, [])

    if (loading) return <></>

    return (
        <Table>
            <TableBody>
                <SelectProducts productName={productName} selectProduct={selectProduct} />
                <InputName projectName={projectName} setProjectName={setProjectName} />
                <InputFiles
                    tableName={localization.favicon}
                    htmlFor={'faviconFile'}
                    thumbnailUrl={faviconThumbnailUrl}
                    setFile={setFaviconFile}
                    setThumbnailUrl={setFaviconThumbnailUrl}
                />
                <InputFiles
                    tableName={localization.logo}
                    htmlFor={'logoFile'}
                    thumbnailUrl={logoThumbnailUrl}
                    setFile={setLogoFile}
                    setThumbnailUrl={setLogoThumbnailUrl}
                />
                <InputURL url={webhookURL} setUrl={setWebhookURL} />

                <TableRow>
                    <TableCell sx={{ borderBottom: 'none', textAlign: 'center' }} colSpan={2}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                            <DefaultButton
                                text={localization.add}
                                onClick={() => createsProject(faviconFile, logoFile, projectName, productName, webhookURL)}
                            />
                            <CancelButton text={localization.cancel} onClick={() => router.back()} />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
