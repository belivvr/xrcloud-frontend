import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'custom/styles/styled'
import { useRouter } from 'next/router'

const PermissionList = () => {
    const router = useRouter()
    return (
        <EnterServiceButton onClick={() => router.push('/permission')}>
            <StyledAddIcon />
        </EnterServiceButton>
    )
}

export default PermissionList
