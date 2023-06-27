import React, { useEffect, useState } from 'react'
import { TableCell, TableRow, Table, TableBody, TextField, Button } from '@mui/material'
import { ImagePreview, ThumbnailBox } from 'custom/styles/styled'
import FaviconUploader from 'custom/common/FaviconFileUploader'
import LogoUploader from 'custom/common/LogoFileUploader'
import { Project } from 'types/project'

interface Props {
    project: Project
    setProject: React.Dispatch<React.SetStateAction<Project | undefined>>
    handleUpdateProject: (
        projectId: string,
        projectName: string,
        faviconFile: File | undefined,
        logoFile: File | undefined
    ) => Promise<void>
    handleDeleteProject: (projectId: string) => Promise<void>
    handleGetProjectKey: (projectId: string) => Promise<Project | undefined>
}

const ProjectPage = ({ project, setProject, handleUpdateProject, handleDeleteProject, handleGetProjectKey }: Props) => {
    const [projectName, setProjectName] = useState('')

    const [faviconPreview, setFaviconPreview] = useState('')
    const [faviconFile, setFaviconFile] = useState<File | undefined>(undefined)
    const [faviconFileList, setFaviconFileList] = useState<FileList>()

    const [logoPreview, setLogoPreview] = useState('')
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined)
    const [logoFileList, setLogoFileList] = useState<FileList>()

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
                    <TableCell style={{ display: 'flex', gap: '16px' }}>
                        <TextField disabled value={project.projectKey} fullWidth />
                        <Button
                            variant="outlined"
                            onClick={async () => {
                                const response = await handleGetProjectKey(project.id)

                                setProject(response)
                            }}
                            style={{ minWidth: '200px', backgroundColor: '#fff', fontSize: '18px', fontWeight: '600' }}
                        >
                            발급 받기
                        </Button>
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
                            <Button
                                onClick={() => handleUpdateProject(project.id, projectName, faviconFile, logoFile)}
                                variant="contained"
                                color="primary"
                            >
                                업데이트
                            </Button>
                            <Button
                                onClick={async () => {
                                    await handleDeleteProject(project.id)
                                }}
                                variant="contained"
                                color="error"
                            >
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
