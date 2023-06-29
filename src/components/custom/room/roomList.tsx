/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import { Room } from 'types/project'
import { BasicContentsButton, GridWrapper } from '../common'
import { CircularProgress } from '@mui/material'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

interface Props {
    roomList: Room[] | undefined
}

const RoomList = ({ roomList }: Props) => {
    const router = useRouter()
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    if (roomList === undefined)
        return (
            <div style={{ height: 'calc(100vh - 264px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={200} />
            </div>
        )

    if (roomList.length === 0) {
        return (
            <div
                style={{
                    height: 'calc(100vh - 264px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '60px',
                    fontWeight: '700',
                    lineHeight: 1.5,
                    textAlign: 'center',
                    whiteSpace: 'pre-line'
                }}
            >
                {localization['not-found-rooms']}
            </div>
        )
    }

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
        </GridWrapper>
    )
}

export default RoomList
