import { TableCell, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { UploaderProps } from 'types/project'
import { FileUploader } from '../common/FileUploader'
import { ImagePreview, ThumbnailBox } from '../styles/styled'

interface Props extends UploaderProps {
    tableName: string
    thumbnailUrl: string
}

function cacheRemove(url: string) {
    if (url.split(':')[0] === 'blob') {
        return url
    }
    return `${url}?timestamp=${Date.now()}`
}

export function InputFiles({ htmlFor, tableName, thumbnailUrl, setFile, setThumbnailUrl }: Props) {
    return (
        <TableRow>
            <TableCell>{tableName}</TableCell>
            <TableCell>
                <ThumbnailBox>
                    <ImagePreview src={cacheRemove(thumbnailUrl)} alt="Favicon Preview" />
                    <FileUploader htmlFor={htmlFor} setFile={setFile} setThumbnailUrl={setThumbnailUrl} />
                </ThumbnailBox>
            </TableCell>
        </TableRow>
    )
}
