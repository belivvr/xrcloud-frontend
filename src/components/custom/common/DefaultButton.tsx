import { Button } from '@mui/material'
import React from 'react'

interface Props {
    text: string
    onClick: () => any
}

export function DefaultButton({ text, onClick }: Props) {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            {text}
        </Button>
    )
}
