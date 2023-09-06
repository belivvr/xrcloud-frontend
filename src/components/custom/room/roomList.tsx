/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import { Room } from 'types/project'
import { BasicContentsButton, GridWrapper } from '../common'
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
        cursor: pointer;
        background-color: rgba(63, 81, 181, 0.04);
    }
`

interface Props {
    isDeleteMode: boolean
    roomList: Room[] | undefined
    sceneId: string | undefined
}

const RoomList = ({ isDeleteMode, roomList, sceneId }: Props) => {
    const router = useRouter()
    const { deleteRoom } = useRoom()

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
                            overflow: 'hidden'
                        }}
                        key={room.id}
                    >
                        {isDeleteMode && (
                            <ListDeleteIcon
                                onClick={() => {
                                    deleteRoom(room.id)
                                }}
                            />
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                            <BasicContentsButton
                                style={{
                                    position: 'relative',
                                    height: '100%',
                                    borderBottomLeftRadius: '0px',
                                    borderBottomRightRadius: '0px',
                                    overflow: 'hidden',
                                    border: 'none'
                                }}
                                onClick={async () => {
                                    router.push(room.roomUrl)
                                }}
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
                            </BasicContentsButton>
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
                                    <span style={{ fontWeight: 700 }}>{room.name}</span>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>ID ) </span>
                                    <span style={{ fontWeight: 700 }}>{room.id}</span>
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    <span>URL ) </span>
                                    <span style={{ fontWeight: 700 }}>{room.roomUrl}</span>
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
