import { TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    projectName: string
    setProjectName: React.Dispatch<React.SetStateAction<string>>
}

export function InputName({ projectName, setProjectName }: Props) {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <TableRow>
            <TableCell>{localization['project-name']}</TableCell>
            <TableCell>
                <TextField
                    fullWidth
                    id="project-name"
                    placeholder={localization['project-name']}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
            </TableCell>
        </TableRow>
    )
}
