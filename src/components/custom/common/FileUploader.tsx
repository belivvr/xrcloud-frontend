import React, { useState } from 'react'
import { UploaderProps } from 'types/project'
import { FindFileBox, UploadName, Label, InputFile } from '../styles/styled'

export const FileUploader: React.FC<UploaderProps> = ({ htmlFor, setThumbnailUrl, setFile }) => {
    const [thumbnailNamePreview, setThumbnailNamePreview] = useState('')

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return
        setFile(file)

        setThumbnailUrl(URL.createObjectURL(file))
        setThumbnailNamePreview(file.name)
    }

    return (
        <div>
            <FindFileBox>
                <UploadName type="text" value={thumbnailNamePreview} placeholder="첨부파일" readOnly />
                <Label htmlFor={htmlFor}>파일찾기</Label>
                <InputFile
                    type="file"
                    name="file"
                    accept="image/jpg"
                    id={htmlFor}
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
                    onChange={onFileChange}
                ></InputFile>
            </FindFileBox>
        </div>
    )
}
