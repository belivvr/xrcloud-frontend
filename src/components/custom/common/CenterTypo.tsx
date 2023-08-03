import { Grid, Typography } from '@mui/material'
import React from 'react'

interface Props {
    description: string
}

export function CenterTypo({ description }: Props) {
    return (
        <Grid item xs={12}>
            <Typography variant="body2">{description}</Typography>
        </Grid>
    )
}
