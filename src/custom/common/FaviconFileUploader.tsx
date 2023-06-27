import { Button } from '@mui/material'
import React, { useState } from 'react'
import { FindFileBox, UploadName, InputFile } from '../styles/styled'

interface PreviewProps {
    faviconFile: File | undefined
    setFaviconFile: React.Dispatch<React.SetStateAction<File | undefined>>
    setFaviconPreview: React.Dispatch<React.SetStateAction<string>>
    faviconPreview: string
    setFaviconFileList: React.Dispatch<React.SetStateAction<FileList | undefined>>
}

const FaviconUploader: React.FC<PreviewProps> = ({
    setFaviconPreview: setFaviconPreview,
    faviconPreview: faviconPreview,
    faviconFile: faviconFile,
    setFaviconFile: setFaviconFile,
    setFaviconFileList: setFaviconFileList
}) => {
    const [thumbnailNamePreview, setThumbnailNamePreview] = useState('')

    const onFaviconChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const favicon = e.target.files?.[0]

        if (!favicon) return
        setFaviconFile(favicon)

        if (e.target.files) {
            setFaviconFileList(e.target.files)
        }
        setFaviconPreview(URL.createObjectURL(favicon))
        setThumbnailNamePreview(favicon.name)
        // }
    }

    return (
        <div>
            <FindFileBox>
                <UploadName type="text" value={thumbnailNamePreview} placeholder="첨부파일" readOnly />
                <InputFile
                    type="file"
                    name="file"
                    accept="image/jpg"
                    id="faviconFile"
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
                    onChange={onFaviconChangeHandler}
                ></InputFile>
                <Button
                    component="label"
                    htmlFor="faviconFile"
                    variant="contained"
                    color="secondary"
                    sx={{ width: '100px', marginLeft: '16px' }}
                >
                    파일찾기
                </Button>
            </FindFileBox>
        </div>
    )
}

export default FaviconUploader
