import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import { UploaderProps } from 'types/project'
import { cacheRemove } from 'utils/cacheRemove'
import { FileUploader } from '../common/FileUploader'
import { ImagePreview, ThumbnailBox } from '../styles/styled'

interface Props extends UploaderProps {
    tableName: string
    thumbnailUrl: string
}

export function InputFiles({ htmlFor, tableName, thumbnailUrl, setFile, setThumbnailUrl }: Props) {
    return (
        <TableRow>
            <TableCell>{tableName}</TableCell>
            <TableCell>
                <ThumbnailBox>
                    <ImagePreview
                        src={cacheRemove(thumbnailUrl)}
                        alt="Favicon Preview"
                        onError={(props) => {
                            props.currentTarget.src = '/assets/images/image_not_available.png'
                        }}
                    />
                    <FileUploader htmlFor={htmlFor} setFile={setFile} setThumbnailUrl={setThumbnailUrl} />
                </ThumbnailBox>
            </TableCell>
        </TableRow>
    )
}
