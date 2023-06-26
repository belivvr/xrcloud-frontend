import React, { useState, useEffect } from 'react'
import { TableCell, TableRow, Table, TableBody, TextField, Button } from '@mui/material'
import { ImagePreview, ThumbnailBox } from 'custom/styles/styled'
import FaviconUploader from 'custom/common/FaviconFileUploader'
import LogoUploader from 'custom/common/LogoFileUploader'
import axios from 'axios'
import { Project } from 'types/project'

const ProjectPage = () => {
    const [projectData, setProjectData] = useState<Project>()
    const [faviconPreview, setFaviconPreview] = useState('')
    const [faviconFile, setFaviconFile] = useState<File | undefined>(undefined)
    const [faviconFileList, setFaviconFileList] = useState<FileList>()
    const [logoPreview, setLogoPreview] = useState('')
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined)
    const [logoFileList, setLogoFileList] = useState<FileList>()
    const [projectName, setProjectName] = useState('')
    const [accessKeyValue, setAccessKeyValue] = useState('')
    const [createAt, setCreateAt] = useState('')
    const [lastUpdateAt, setLastUpdateAt] = useState('')

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>프로젝트이름</TableCell>
                    <TableCell>
                        <TextField fullWidth />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>파비콘</TableCell>
                    <TableCell>
                        <ThumbnailBox>
                            <ImagePreview src={faviconPreview} alt="Favicon Preview" />

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
                            <ImagePreview src={logoPreview} alt="Logo Preview" />

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
                    <TableCell>AccessKey</TableCell>
                    <TableCell>
                        <TextField fullWidth />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>생성</TableCell>
                    <TableCell>
                        <TextField fullWidth />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>마지막 업데이트</TableCell>
                    <TableCell>
                        <TextField fullWidth />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ borderBottom: 'none', textAlign: 'center' }} colSpan={2}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                            <Button variant="contained" color="primary">
                                업데이트
                            </Button>
                            <Button variant="contained" color="error">
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
