import styled from '@emotion/styled'
import { useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface WrapperStyleProps {
    md: boolean
    sm: boolean
}

const Wrapper = styled.div<WrapperStyleProps>`
    display: grid;
    grid-template-columns: ${({ md, sm }) => {
        if (sm) {
            return 'repeat(1, 1fr)'
        }
        if (md) {
            return 'repeat(2, 1fr)'
        }
        return 'repeat(3, 1fr)'
    }};
    gap: 8px;
`

interface Props {
    children?: React.ReactNode
}

export function GridWrapper({ children }: Props) {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Wrapper sm={matchDownSM} md={matchDownMd}>
            {children}
        </Wrapper>
    )
}
