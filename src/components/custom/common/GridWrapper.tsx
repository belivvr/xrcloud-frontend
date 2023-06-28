import styled from '@emotion/styled'
import React from 'react'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
`

interface Props {
    children?: React.ReactNode
}

export function GridWrapper({ children }: Props) {
    return <Wrapper>{children}</Wrapper>
}
