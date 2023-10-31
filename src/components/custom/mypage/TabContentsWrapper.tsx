import { CardContent, Grid } from '@mui/material'
import React from 'react'
import { TabPanel, UserProfile } from '.'
import ManagementAccount from './ManagementAccount'

interface Props {
    value: number
    email: string
    receivedApiKey: string | undefined
}

export default function TabContentsWrapper({ value, email, receivedApiKey }: Props) {
    return (
        <Grid item xs={12} lg={9}>
            <CardContent
                sx={{
                    height: '100%'
                }}
            >
                <TabPanel value={value} index={0}>
                    <UserProfile email={email} receivedApiKey={receivedApiKey} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ManagementAccount />
                </TabPanel>
            </CardContent>
        </Grid>
    )
}
