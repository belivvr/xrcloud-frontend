/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Room } from 'types/project'
import { GridWrapper } from '../common'
import { Button, CircularProgress } from '@mui/material'
import { StyledAddIcon } from '../styles/styled'
import styled from '@emotion/styled'
import ListDeleteIcon from '../common/ListDeleteIcon'
import { useRoom } from 'hooks/api/useRoom'
import BasicModal from '../common/BasicModal'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

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
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')

    const handleOpen = () => setModalOpen(true)
    const handleClose = () => setModalOpen(false)

    if (roomList === undefined)
        return (
            <div style={{ height: 'calc(100vh - 264px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={200} />
            </div>
        )

    return (
        <GridWrapper>
            <BasicModal
                mainText={localization['delete-room-modal']}
                buttonLeftText={localization['delete-project-modal-left-button']}
                buttonRightText={localization['delete-project-modal-right-button']}
                open={modalOpen}
                handleClose={handleClose}
                handleRightButton={async () => {
                    await deleteRoom(selectedRoomId)
                    const rooms = await getRooms()
                    setRoomList(rooms.items)
                    handleClose()
                }}
            />
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
                                onClick={() => {
                                    handleOpen()
                                    setSelectedRoomId(room.id)
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
                                    <span>이름 ) </span>
                                    <span>{room.name}</span>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>ID ) </span>
                                    <span>{room.id}</span>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>HOST URL ) </span>
                                    <span>{room.roomUrl.host}</span>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>GUEST URL ) </span>
                                    <span>{room.roomUrl.guest}</span>
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
