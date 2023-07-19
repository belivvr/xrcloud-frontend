/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import { Room } from 'types/project'
import { GridWrapper } from '../common'
import { Button, CircularProgress, styled } from '@mui/material'
import { StyledAddIcon } from '../styles/styled'

export const CreateRoom = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: white;
    border: 1px solid #eee;
    color: #000;
`

interface Props {
    roomList: Room[] | undefined
    sceneId: string | undefined
}

const RoomList = ({ roomList, sceneId }: Props) => {
    const router = useRouter()

    if (roomList === undefined)
        return (
            <div style={{ height: 'calc(100vh - 264px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={200} />
            </div>
        )

    return (
        <GridWrapper>
            {roomList?.map((room: Room) => {
                return (
                    <div
                        style={{
                            minWidth: '64px',
                            border: '1px solid #eee'
                        }}
                        key={room.id}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', objectFit: 'cover' }}>
                            <img style={{ height: '250px', objectFit: 'contain' }} src={room.thumbnailUrl} alt={room.thumbnailUrl} />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '62px',
                                    color: '#333',
                                    borderTop: '1px solid #eee'
                                }}
                            >
                                {room.roomUrl}
                            </div>
                        </div>
                    </div>
                )
            })}
            <CreateRoom
                onClick={() => {
                    const projectId = localStorage.getItem('projectId')
                    router.push(`/createRoom?projectId=${projectId}&sceneId=${sceneId}`)
                }}
            >
                <StyledAddIcon color="inherit" />
            </CreateRoom>
        </GridWrapper>
    )
}

export default RoomList
