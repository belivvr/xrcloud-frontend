import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    SelectChangeEvent
} from '@mui/material'
import { ImagePreview, ThumbnailBox } from 'components/custom/styles/styled'
import FaviconUploader from 'components/custom/common/FaviconFileUploader'
import LogoUploader from 'components/custom/common/LogoFileUploader'
import { useRefresh } from 'hooks/useRefresh'
import { createRequestOptions } from 'utils/createRequestOptions'
import router from 'next/router'

const AddProjectPage = () => {
    const [productName, setProductName] = useState<string>('')
    const [projectName, setProjectName] = useState<string>('')

    const [faviconPreview, setFaviconPreview] = useState('')
    const [faviconFile, setFaviconFile] = useState<File | undefined>(undefined)
    const [faviconFileList, setFaviconFileList] = useState<FileList>()

    const [logoPreview, setLogoPreview] = useState('')
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined)
    const [logoFileList, setLogoFileList] = useState<FileList>()

    const accessToken = localStorage.getItem('accessToken')
    const { renewTokens } = useRefresh()

    const handleSelectProduct = (event: SelectChangeEvent) => {
        setProductName(event.target.value)
    }

    const handleCreatesProject = async () => {
        if (!faviconFile || !logoFile) return alert('파비콘과 로고를 모두 등록해주세요')

        const formData = new FormData()
        formData.append('projectName', projectName)
        formData.append('productName', productName)
        formData.append('favicon', faviconFile)
        formData.append('logo', logoFile)

        let requestOptions = createRequestOptions('POST', accessToken, formData)

        const data = await fetch('/api/projects/create', requestOptions)
        if (data.status === 401) {
            const retoken = await renewTokens()
            requestOptions = createRequestOptions('POST', retoken.accessToken, formData)
            await fetch('/api/projects/create', requestOptions)
        }

        const { projectKey } = await data.json()
        localStorage.setItem('projectKey', projectKey)

        router.push(`/projects`)
    }

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>제품</TableCell>
                    <TableCell>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>제품</InputLabel>
                            <Select label="제품" value={productName} onChange={handleSelectProduct}>
                                <MenuItem value={1}>hubs</MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>프로젝트 이름</TableCell>
                    <TableCell>
                        <TextField
                            fullWidth
                            placeholder="프로젝트 이름"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
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
                    <TableCell sx={{ borderBottom: 'none', textAlign: 'center' }} colSpan={2}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                            <Button variant="contained" color="primary" onClick={handleCreatesProject}>
                                확인
                            </Button>
                            <Button variant="contained" color="error">
                                취소
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default AddProjectPage
