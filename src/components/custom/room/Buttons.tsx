import { Button } from '@mui/material'
import React from 'react'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    roomEnter: () => void
    roomUpdate: () => void
    roomDelete: () => void
}

export default function Buttons({ roomEnter, roomUpdate, roomDelete }: Props) {
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
            <Button onClick={roomEnter} variant="contained">
                {localization.enter}
            </Button>
            <Button onClick={roomUpdate} variant="contained" color="secondary">
                {localization.modify}
            </Button>
            <Button onClick={roomDelete} variant="contained" sx={{ backgroundColor: '#EA0000' }}>
                {localization.delete}
            </Button>
        </div>
    )
}
