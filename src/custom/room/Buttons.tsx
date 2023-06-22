import { Button } from '@mui/material'
import React from 'react'

interface Props {
    handleRoomEnter: () => void
    handleRoomUpdate: () => void
    handleRoomDelete: () => void
}

export default function Buttons({ handleRoomEnter, handleRoomUpdate, handleRoomDelete }: Props) {
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
            <Button onClick={handleRoomEnter} variant="contained">
                PROJECTS.HUBS.ROOMS.ENTER
            </Button>
            <Button onClick={handleRoomUpdate} variant="contained">
                수정
            </Button>
            <Button onClick={handleRoomDelete} variant="contained" sx={{ backgroundColor: '#EA0000' }}>
                삭제
            </Button>
        </div>
    )
}
