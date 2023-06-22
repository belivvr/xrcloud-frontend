import React, { useState } from 'react'
import { FindFileBox, UploadName, Label, InputFile } from '../styles/styled'

interface PreviewProps {
    logoFile: File | undefined
    setLogoFile: React.Dispatch<React.SetStateAction<File | undefined>>
    setLogoPreview: React.Dispatch<React.SetStateAction<string>>
    logoPreview: string
    setLogoFileList: React.Dispatch<React.SetStateAction<FileList | undefined>>
}

const LogoUploader: React.FC<PreviewProps> = ({
    setLogoPreview: setLogoPreview,
    logoPreview: logoPreview,
    logoFile: logoFile,
    setLogoFile: setLogoFile,
    setLogoFileList: setLogoFileList
}) => {
    const [thumbnailNamePreview, setThumbnailNamePreview] = useState('')

    const onLogoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const logo = e.target.files?.[0]

        if (!logo) return
        setLogoFile(logo)

        if (e.target.files) {
            setLogoFileList(e.target.files)
        }
        setLogoPreview(URL.createObjectURL(logo))
        setThumbnailNamePreview(logo.name)
        // }
    }

    return (
        <div>
            <FindFileBox>
                <UploadName type="text" value={thumbnailNamePreview} placeholder="첨부파일" readOnly />
                <Label htmlFor="logoFile">파일찾기</Label>
                <InputFile
                    type="file"
                    name="file"
                    accept="image/jpg"
                    id="logoFile"
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
                    onChange={onLogoChangeHandler}
                ></InputFile>
            </FindFileBox>
        </div>
    )
}

export default LogoUploader
