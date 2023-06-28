import { Button } from '@mui/material'
import React from 'react'

interface Props {
    roomEnter: () => void
    roomUpdate: () => void
    roomDelete: () => void
}

export default function Buttons({ roomEnter, roomUpdate, roomDelete }: Props) {
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
                PROJECTS.HUBS.ROOMS.ENTER
            </Button>
            <Button onClick={roomUpdate} variant="contained">
                수정
            </Button>
            <Button onClick={roomDelete} variant="contained" sx={{ backgroundColor: '#EA0000' }}>
                삭제
            </Button>
        </div>
    )
}
