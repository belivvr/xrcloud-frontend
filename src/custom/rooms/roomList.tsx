import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'custom/styles/styled'
import { useRouter } from 'next/router'

const RoomList = () => {
    const router = useRouter()

    return (
        <EnterServiceButton onClick={() => router.push('/room')}>
            <StyledAddIcon />
        </EnterServiceButton>
    )
}

export default RoomList
