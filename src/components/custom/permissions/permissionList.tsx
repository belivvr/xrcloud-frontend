import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { useRouter } from 'next/router'
import { v4 } from 'uuid'

const PermissionList = () => {
    const router = useRouter()
    return (
        <EnterServiceButton onClick={() => router.push(`/permissions/${v4()}`)}>
            <StyledAddIcon />
        </EnterServiceButton>
    )
}

export default PermissionList
