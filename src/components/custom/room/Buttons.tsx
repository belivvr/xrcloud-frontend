import { Button } from '@mui/material'
import React from 'react'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import router from 'next/router'

interface Props {
    roomDelete: (roomId: string) => Promise<unknown>
}

export default function Buttons({ roomDelete }: Props) {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const roomId = router.query.id as string

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
            <Button
                onClick={async () => {
                    try {
                        await roomDelete(roomId)
                        router.push('/rooms')
                    } catch (e) {
                        console.log(e)
                    }
                }}
                variant="contained"
                sx={{ backgroundColor: '#EA0000' }}
            >
                {localization.delete}
            </Button>
        </div>
    )
}
