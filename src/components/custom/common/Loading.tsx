import { CircularProgress } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import Page from 'ui-component/Page'

interface Props {
    title: string
}

export default function Loading({ title }: Props) {
    return (
        <Page title={title}>
            <MainCard title={title}>
                <div
                    style={{
                        width: '100%',
                        height: 'calc(100vh - 246px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <CircularProgress size={100} />
                </div>
            </MainCard>
        </Page>
    )
}
