/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { useRouter } from 'next/router'
import { Room } from 'types/project'
import { BasicContentsButton, GridWrapper } from '../common'

interface Props {
    roomList: Room[] | undefined
}

const RoomList = ({ roomList }: Props) => {
    const router = useRouter()

    return (
        <GridWrapper>
            {roomList?.map((room: Room) => {
                return (
                    <BasicContentsButton onClick={() => router.push(`/rooms/${room.id}`)} key={room.id}>
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
                                {room.name}
                            </div>
                        </div>
                    </BasicContentsButton>
                )
            })}
            <EnterServiceButton onClick={() => router.push('/createRoom')}>
                <StyledAddIcon />
            </EnterServiceButton>
        </GridWrapper>
    )
}

export default RoomList
