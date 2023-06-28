import { Checkbox, TableCell, TableRow } from '@mui/material'
import React from 'react'

interface Props {
    title: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

export default function BasicTableCheckbox({ title, onChange }: Props) {
    return (
        <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell>
                <Checkbox onChange={onChange} />
            </TableCell>
        </TableRow>
    )
}
