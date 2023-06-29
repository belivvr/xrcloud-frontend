import React from 'react'
import MainCard from 'ui-component/cards/MainCard'

interface Props {
    children?: React.ReactNode
    title: string
}

export function MainCardCustom({ children, title }: Props) {
    return (
        <MainCard
            sx={{
                overflow: 'scroll',
                maxHeight: 'calc(100vh - 124px)'
            }}
            title={title}
        >
            {children}
        </MainCard>
    )
}
