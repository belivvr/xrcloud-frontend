import { TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'

interface Props {
    type: React.InputHTMLAttributes<unknown>['type']
    title: string
    value: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function BasicTableInput({ type, title, value, placeholder, onChange }: Props) {
    return (
        <TableRow>
            <TableCell>{title}</TableCell>
            <TableCell>
                <TextField type={type} fullWidth placeholder={placeholder} value={value} onChange={onChange} />
            </TableCell>
        </TableRow>
    )
}
