import { TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'

interface Props {
    projectName: string
    setProjectName: React.Dispatch<React.SetStateAction<string>>
}

export function InputName({ projectName, setProjectName }: Props) {
    return (
        <TableRow>
            <TableCell>프로젝트 이름</TableCell>
            <TableCell>
                <TextField fullWidth placeholder="프로젝트 이름" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </TableCell>
        </TableRow>
    )
}
