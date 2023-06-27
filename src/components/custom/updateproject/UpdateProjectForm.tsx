import React, { useEffect, useState } from 'react'
import { TableCell, TableRow, Table, TableBody } from '@mui/material'
import { Project } from 'types/project'
import { BasicTableRow, CancelButton, DefaultButton, InputFiles, InputName } from '../common'
import { GenerateProjectKey } from '.'

interface Props {
    project: Project
    setProject: React.Dispatch<React.SetStateAction<Project | undefined>>
    updateProject: (projectId: string, projectName: string, faviconFile: File | undefined, logoFile: File | undefined) => Promise<void>
    deleteProject: (projectId: string) => Promise<void>
    getProjectKey: (projectId: string) => Promise<Project | undefined>
}

export function UpdateProjectForm({ project, setProject, updateProject, deleteProject, getProjectKey }: Props) {
    const [projectName, setProjectName] = useState('')
    const [faviconThumbnailUrl, setFaviconThumbnailUrl] = useState('')
    const [faviconFile, setFaviconFile] = useState<File | undefined>(undefined)
    const [logoThumbnailUrl, setLogoThumbnailUrl] = useState('')
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined)

    useEffect(() => {
        if (project) {
            setProjectName(project.name)
            setLogoThumbnailUrl(project.logoUrl)
            setFaviconThumbnailUrl(project.faviconUrl)
        }
    }, [project])

    return (
        <Table>
            <TableBody>
                <InputName projectName={projectName} setProjectName={setProjectName} />
                <InputFiles
                    tableName={'파비콘'}
                    htmlFor={'faviconFile'}
                    thumbnailUrl={faviconThumbnailUrl}
                    setFile={setFaviconFile}
                    setThumbnailUrl={setFaviconThumbnailUrl}
                />
                <InputFiles
                    tableName={'로고'}
                    htmlFor={'logoFile'}
                    thumbnailUrl={logoThumbnailUrl}
                    setFile={setLogoFile}
                    setThumbnailUrl={setLogoThumbnailUrl}
                />
                <GenerateProjectKey project={project} setProject={setProject} getProjectKey={getProjectKey} />
                <BasicTableRow tableName={'생성 일자'} value={project.createdAt} />
                <BasicTableRow tableName={'마지막 업데이트'} value={project.updatedAt} />
                <TableRow>
                    <TableCell sx={{ borderBottom: 'none', textAlign: 'center' }} colSpan={2}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                            <DefaultButton
                                text={'업데이트'}
                                onClick={() => updateProject(project.id, projectName, faviconFile, logoFile)}
                            />
                            <CancelButton text={'삭제'} onClick={() => deleteProject(project.id)} />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
