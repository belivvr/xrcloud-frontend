import { Button } from '@mui/material'
import React from 'react'

interface Props {
    text: string
    onClick: () => any
}

export function CancelButton({ text, onClick }: Props) {
    return (
        <Button variant="contained" color="error" onClick={onClick}>
            {text}
        </Button>
    )
}
