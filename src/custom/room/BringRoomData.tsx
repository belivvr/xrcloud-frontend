import { CircularProgress } from '@mui/material'
import React from 'react'
import MainCard from 'ui-component/cards/MainCard'
import Page from 'ui-component/Page'

export default function BringRoomData() {
    return (
        <Page title="Room">
            <MainCard title="Room">
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
