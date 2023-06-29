import { Button } from '@mui/material'
import React from 'react'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    roomDelete: () => void
}

export default function Buttons({ roomDelete }: Props) {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                marginTop: '16px'
            }}
        >
            <Button onClick={roomDelete} variant="contained" sx={{ backgroundColor: '#EA0000' }}>
                {localization.delete}
            </Button>
        </div>
    )
}
