import { TableCell, TableRow, TextField } from '@mui/material'
import React from 'react'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    url: string | null
    setUrl: React.Dispatch<React.SetStateAction<string | null>>
}

export function InputURL({ url, setUrl }: Props) {
    const { locale } = useConfig()
    return (
        <TableRow>
            <TableCell> Webhook URL </TableCell>
            <TableCell>
                <TextField fullWidth id="webhook-url" placeholder="Webhook URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            </TableCell>
        </TableRow>
    )
}
