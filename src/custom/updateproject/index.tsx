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
    const [copyToken, setCopyToken] = useState('')
    const [projectName, setProjectName] = useState('')
    const [accessKeyValue, setAccessKeyValue] = useState('')
    const [createAt, setCreateAt] = useState('')
    const [lastUpdateAt, setLastUpdateAt] = useState('')

    // useEffect(()=> {
    //     try {
    //         const accessToken = localStorage.getItem('accessToken')
    //         const data = await axios.get(``, {
    //             prams : {
    //                 accessToken
    //             }
    //         })
    //         setProjectData(data.data)

    //     } catch (error : any){

    //     }
    // })

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            setCopyToken(accessToken)
        }
    }, [])

    const handleCopyToken = () => {
        console.log(copyToken)
        if (!copyToken) {
            alert('복사할 토큰이 없습니다')
            return
        }
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(copyToken)
                .then(() => {
                    alert('토큰이 클립보드에 복사되었습니다')
                })
                .catch(() => {
                    alert('복사를 다시 시도해주세요')
                })
        } else {
            if (!document.queryCommandSupported('copy')) {
                alert('복사하기가 지원되지 않는 브라우저 입니다')
            }
            const textarea = document.createElement('textarea')
            textarea.value = copyToken
            textarea.style.top = '0'
            textarea.style.left = '0'
            textarea.style.position = 'fixed'

            document.body.appendChild(textarea)
            textarea.focus()
            textarea.select()

            document.execCommand('copy')
            document.body.removeChild(textarea)
            alert('토큰이 클립보드에 복사되었습니다.')
        }
    }

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
                    <TableCell>
                        토큰
                        <Button variant="contained" color="secondary" sx={{ marginLeft: '16px', width: '130px' }} onClick={handleCopyToken}>
                            클립보드에복사
                        </Button>
                    </TableCell>
                    <TableCell sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                        <TextField fullWidth value={copyToken} />
                        <Button variant="contained" color="info" sx={{ width: '130px' }}>
                            토큰 재발급
                        </Button>
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
