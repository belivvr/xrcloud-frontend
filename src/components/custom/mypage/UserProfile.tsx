import { Avatar, Button, Grid, TextField, Typography } from '@mui/material'
import { gridSpacing } from 'constant'
import React, { useEffect, useState } from 'react'

interface Props {
    email: string
    receivedApiKey: string | undefined
}

export function UserProfile({ email, receivedApiKey }: Props) {
    const [value, setValue] = useState(receivedApiKey)

    useEffect(() => {
        setValue(receivedApiKey)
    }, [receivedApiKey])

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar alt="User 1" sx={{ height: 80, width: 80 }} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h5">{email}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
