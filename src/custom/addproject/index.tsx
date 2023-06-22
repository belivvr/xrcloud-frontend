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
import { ImagePreview, ThumbnailBox } from 'custom/styles/styled'
import FaviconUploader from 'custom/common/FaviconFileUploader'
import LogoUploader from 'custom/common/LogoFileUploader'
import { selectProjectList } from 'store/slices/project'
import { useDispatch, useSelector } from 'store'
import { addProject } from 'store/slices/project'
import { useRouter } from 'next/router'

const AddProjectPage = () => {
    const [productName, setProductName] = useState<string>('')
    const [faviconPreview, setFaviconPreview] = useState('')
    const [faviconFile, setFaviconFile] = useState<File | undefined>(undefined)
    const [faviconFileList, setFaviconFileList] = useState<FileList>()
    const [logoPreview, setLogoPreview] = useState('')
    const [logoFile, setLogoFile] = useState<File | undefined>(undefined)
    const [logoFileList, setLogoFileList] = useState<FileList>()

    const handleSelectProduct = (event: SelectChangeEvent) => {
        setProductName(event.target.value)
    }
    const dispatch = useDispatch()
    const projectList = useSelector(selectProjectList)
    const router = useRouter()

    const handleConfirmProject = () => {
        const newProject = { id: projectList.length + 1, name: `프로젝트 ${projectList.length + 1}` }
        dispatch(addProject(newProject))
        router.push(`/projects`)
    }
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>제품</TableCell>
                    <TableCell>
                        <FormControl sx={{ m: 1, minWidth: 120, marginBottom: '30px' }}>
                            <InputLabel id="product-name">제품</InputLabel>
                            <Select
                                labelId="product-name"
                                id="Product"
                                name="Product"
                                label="제품"
                                value={productName}
                                onChange={handleSelectProduct}
                            >
                                <MenuItem value={1}>hubs</MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>프로젝트 이름</TableCell>
                    <TableCell>
                        <TextField fullWidth label="프로젝트 이름" />
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
                            <Button variant="contained" color="primary" onClick={handleConfirmProject}>
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
