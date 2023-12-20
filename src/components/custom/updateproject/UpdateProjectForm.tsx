import React, { useEffect, useState } from 'react'
import { TableCell, TableRow, Table, TableBody } from '@mui/material'
import { Project } from 'types/project'
import { BasicTableRow, CancelButton, DefaultButton, InputFiles, InputName } from '../common'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import BasicModal from '../common/BasicModal'
import { InputURL } from '../common/InputURL'

interface Props {
    project: Project
    updateProject: (
        projectId: string,
        projectName: string,
        webhookUrl: string | null,
        faviconFile: File | undefined,
        logoFile: File | undefined
    ) => Promise<void>
    deleteProject: (projectId: string) => Promise<void>
}

export function UpdateProjectForm({ project, updateProject, deleteProject }: Props) {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const [projectName, setProjectName] = useState('')
    const [faviconThumbnailUrl, setFaviconThumbnailUrl] = useState('')
    const [faviconFile, setFaviconFile] = useState<File | undefined>(undefined)
    const [logoThumbnailUrl, setLogoThumbnailUrl] = useState('')
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined)
    const [modalOpen, setModalOpen] = useState(false)
    const [webhookUrl, setWebhookUrl] = useState<string | null>(null)
    const handleOpen = () => setModalOpen(true)
    const handleClose = () => setModalOpen(false)

    useEffect(() => {
        if (project) {
            setProjectName(project.name)
            setLogoThumbnailUrl(project.logoUrl)
            setFaviconThumbnailUrl(project.faviconUrl)
            setWebhookUrl(project.webhookUrl)
        }
    }, [project])

    return (
        <Table>
            <BasicModal
                mainText={localization['delete-project-modal']}
                buttonLeftText={localization['delete-project-modal-left-button']}
                buttonRightText={localization['delete-project-modal-right-button']}
                open={modalOpen}
                handleClose={handleClose}
                handleRightButton={() => {
                    deleteProject(project.id)
                }}
            />
            <TableBody>
                <BasicTableRow tableName={localization['project-id']} value={project.id} />

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
                <InputURL url={webhookUrl} setUrl={setWebhookUrl} />
                <BasicTableRow tableName={localization['creation-date']} value={project.createdAt} />
                <BasicTableRow tableName={localization['last-update']} value={project.updatedAt} />
                <TableRow>
                    <TableCell sx={{ borderBottom: 'none', textAlign: 'center' }} colSpan={2}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                            <DefaultButton
                                text={localization.update}
                                onClick={() => updateProject(project.id, projectName, webhookUrl, faviconFile, logoFile)}
                            />
                            <CancelButton
                                text={localization.delete}
                                onClick={() => {
                                    handleOpen()
                                }}
                            />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
