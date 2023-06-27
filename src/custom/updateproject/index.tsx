import React, { useEffect, useState } from 'react'
import { TableCell, TableRow, Table, TableBody, TextField, Button } from '@mui/material'
import { ImagePreview, ThumbnailBox } from 'custom/styles/styled'
import FaviconUploader from 'custom/common/FaviconFileUploader'
import LogoUploader from 'custom/common/LogoFileUploader'
import { Project } from 'types/project'
import { createRequestOptions } from 'utils/createRequestOptions'
import { useRefresh } from 'hooks/useRefresh'
import router from 'next/router'
import { useRequest } from 'hooks/useRequest'

interface Props {
    project: Project
}

const ProjectPage = ({ project }: Props) => {
    const [projectName, setProjectName] = useState('')

    const [faviconPreview, setFaviconPreview] = useState('')
    const [faviconFile, setFaviconFile] = useState<File | undefined>(undefined)
    const [faviconFileList, setFaviconFileList] = useState<FileList>()

    const [logoPreview, setLogoPreview] = useState('')
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined)
    const [logoFileList, setLogoFileList] = useState<FileList>()

    const accessToken = localStorage.getItem('accessToken')
    const { renewTokens } = useRefresh()
    const { deleteRequest } = useRequest()

    const handleUpdateProject = async () => {
        const formData = new FormData()
        formData.append('projectId', project.id)
        formData.append('projectName', projectName)

        if (faviconFile) {
            formData.append('favicon', faviconFile)
        }

        if (logoFile) {
            formData.append('logo', logoFile)
        }

        let requestOptions = createRequestOptions('PATCH', accessToken, formData)

        const data = await fetch('/api/projects/update', requestOptions)
        if (data.status === 401) {
            const retoken = await renewTokens()
            requestOptions = createRequestOptions('PATCH', retoken.accessToken, formData)
            await fetch('/api/projects/update', requestOptions)
        }

        router.push(`/projects`)
    }

    const handleDeleteProject = async () => {
        try {
            await deleteRequest('/api/projects/delete', {
                params: {
                    projectId: project.id
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            router.push('/projects')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (project) {
            setProjectName(project.name)
            setLogoPreview(project.logoUrl)
            setFaviconPreview(project.faviconUrl)
        }
    }, [project])

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>프로젝트이름</TableCell>
                    <TableCell>
                        <TextField onChange={(e) => setProjectName(e.target.value)} value={projectName} fullWidth />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>파비콘</TableCell>
                    <TableCell>
                        <ThumbnailBox>
                            <ImagePreview src={faviconPreview} alt={faviconPreview} />

                            <FaviconUploader
                                setFaviconPreview={setFaviconPreview}
                                faviconPreview={faviconPreview}
                                faviconFile={faviconFile}
                                setFaviconFileList={setFaviconFileList}
                                setFaviconFile={setFaviconFile}
                            />
                        </ThumbnailBox>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>로고</TableCell>
                    <TableCell>
                        <ThumbnailBox>
                            <ImagePreview src={logoPreview} alt={logoPreview} />

                            <LogoUploader
                                setLogoPreview={setLogoPreview}
                                logoPreview={logoPreview}
                                logoFile={logoFile}
                                setLogoFileList={setLogoFileList}
                                setLogoFile={setLogoFile}
                            />
                        </ThumbnailBox>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Project Key</TableCell>
                    <TableCell>
                        <TextField disabled value={project.projectKey} fullWidth />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>생성 일자</TableCell>
                    <TableCell>
                        <TextField disabled value={project.createdAt} fullWidth />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>마지막 업데이트</TableCell>
                    <TableCell>
                        <TextField disabled value={project.updatedAt} fullWidth />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ borderBottom: 'none', textAlign: 'center' }} colSpan={2}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                            <Button onClick={handleUpdateProject} variant="contained" color="primary">
                                업데이트
                            </Button>
                            <Button onClick={handleDeleteProject} variant="contained" color="error">
                                삭제
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default ProjectPage
