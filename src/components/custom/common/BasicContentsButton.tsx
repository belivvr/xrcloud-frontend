import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React from 'react'

const ContentsButton = styled(Button)`
    border: 1px solid #eee;
    padding: 0;
`

interface Props {
    onClick?: () => any
    children?: React.ReactNode
}

export function BasicContentsButton({ onClick, children }: Props) {
    return <ContentsButton onClick={onClick}>{children}</ContentsButton>
}
