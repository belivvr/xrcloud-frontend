import { Box, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'

interface Props {
    icon: JSX.Element
}

export function Icon({ icon }: Props) {
    const theme = useTheme()

    return (
        <Grid item xs={12}>
            <Box
                sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
                    color: theme.palette.primary.main,
                    '& > svg': {
                        width: 35,
                        height: 35
                    }
                }}
            >
                {icon}
            </Box>
        </Grid>
    )
}
