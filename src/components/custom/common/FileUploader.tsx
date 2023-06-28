import { useTheme } from '@mui/material'
import React, { useState } from 'react'
import { UploaderProps } from 'types/project'
import { FindFileBox, UploadName, Label, InputFile } from '../styles/styled'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

export const FileUploader: React.FC<UploaderProps> = ({ htmlFor, setThumbnailUrl, setFile }) => {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const [thumbnailNamePreview, setThumbnailNamePreview] = useState('')
    const theme = useTheme()

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
                <UploadName type="text" value={thumbnailNamePreview} placeholder={localization.attachment} readOnly />
                <Label style={{ backgroundColor: theme.palette.primary.main }} htmlFor={htmlFor}>
                    {localization.browse}
                </Label>
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
