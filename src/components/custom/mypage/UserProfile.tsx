import { Avatar, Button, Grid, TextField, Typography } from '@mui/material'
import { gridSpacing } from 'constant'
import React from 'react'

interface Props {
    receivedApiKey: string | undefined
    genrateApiKey: () => Promise<void>
}

export function UserProfile({ receivedApiKey, genrateApiKey }: Props) {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} spacing={2}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Avatar alt="User 1" sx={{ height: 80, width: 80 }} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h5">example@belivvr.com</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ display: 'flex', alignItems: 'center', height: '50px', marginTop: '20px', gap: '10px' }}>
                    <TextField disabled value={receivedApiKey} fullWidth />
                    <Button onClick={genrateApiKey} variant="contained" style={{ width: '200px', height: '100%' }}>
                        CREATE API KEY
                    </Button>
                </div>
            </Grid>
        </Grid>
    )
}
