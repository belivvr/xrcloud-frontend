import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { useRouter } from 'next/router'
import { Room } from 'types/project'

interface Props {
    roomList: Room[] | undefined
}

const RoomList = ({ roomList }: Props) => {
    const router = useRouter()

    return (
        <>
            <EnterServiceButton onClick={() => router.push('/createRoom')}>
                <StyledAddIcon />
            </EnterServiceButton>
        </>
    )
}

export default RoomList
