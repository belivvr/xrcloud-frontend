import { Grid, Typography, useTheme } from '@mui/material'
import React from 'react'

interface Props {
    title: string
}

export function Title({ title }: Props) {
    const theme = useTheme()

    return (
        <Grid item xs={12}>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.5625rem',
                    fontWeight: 500,
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -15,
                        left: 'calc(50% - 25px)',
                        width: 50,
                        height: 4,
                        background: theme.palette.primary.main,
                        borderRadius: '3px'
                    }
                }}
            >
                {title}
            </Typography>
        </Grid>
    )
}
