import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React from 'react'

const ContentsButton = styled(Button)`
    border: 1px solid #eee;
    padding: 0;
    :hover {
        background-color: #e8eaf6;
        border: 1px solid #aeaeae;
    }
`

interface Props {
    onClick?: () => any
    children?: React.ReactNode
    style?: React.CSSProperties
}

export function BasicContentsButton({ onClick, children, style }: Props) {
    return (
        <ContentsButton style={{ ...style }} onClick={onClick}>
            {children}
        </ContentsButton>
    )
}
