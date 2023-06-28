import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { useRouter } from 'next/router'

const RoomList = () => {
    const router = useRouter()

    return (
        <EnterServiceButton onClick={() => router.push('/createRoom')}>
            <StyledAddIcon />
        </EnterServiceButton>
    )
}

export default RoomList
