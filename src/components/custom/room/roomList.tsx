/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import { Room } from 'types/project'
import { GridWrapper } from '../common'
import { Button, CircularProgress } from '@mui/material'
import { StyledAddIcon } from '../styles/styled'
import styled from '@emotion/styled'
import ListDeleteIcon from '../common/ListDeleteIcon'
import { useRoom } from 'hooks/api/useRoom'

export const CreateRoom = styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: white;
    border: 1px solid #eee;
    color: #000;
`

const Image = styled.img`
    transition: all 0.15s ease;
    &:hover {
        background-color: rgba(63, 81, 181, 0.04);
    }
`

interface Props {
    isDeleteMode: boolean
    roomList: Room[] | undefined
    sceneId: string | undefined
    setRoomList: React.Dispatch<React.SetStateAction<Room[] | undefined>>
    handleClickRoom: (room: Room) => void
}

const RoomList = ({ isDeleteMode, roomList, sceneId, setRoomList, handleClickRoom }: Props) => {
    const router = useRouter()
    const { getRooms, deleteRoom } = useRoom()

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
                            position: 'relative',
                            minWidth: '64px',
                            border: '1px solid #eee',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}
                        key={room.id}
                    >
                        {isDeleteMode && (
                            <ListDeleteIcon
                                onClick={async () => {
                                    await deleteRoom(room.id)
                                    const rooms = await getRooms()
                                    setRoomList(rooms.items)
                                }}
                            />
                        )}
                        <div
                            onClick={() => handleClickRoom(room)}
                            style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}
                        >
                            <Image
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    objectFit: 'cover'
                                }}
                                src={room.thumbnailUrl}
                                alt={room.thumbnailUrl}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    padding: '14px 14px',
                                    color: '#333',
                                    borderTop: '1px solid #eee'
                                }}
                            >
                                <div style={{ marginBottom: '5px' }}>
                                    <span>Name ) </span>
                                    <span>{room.name}</span>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>ID ) </span>
                                    <span>{room.id}</span>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>URL ) </span>
                                    <span>{room.roomUrl}</span>
                                </div>
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
