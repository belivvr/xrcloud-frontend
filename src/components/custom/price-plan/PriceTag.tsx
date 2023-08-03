import { Grid, Typography } from '@mui/material'
import React from 'react'

interface Props {
    price: number
}

export function PriceTag({ price }: Props) {
    return (
        <Grid item xs={12}>
            <Typography
                component="div"
                variant="body2"
                sx={{
                    fontSize: '2.1875rem',
                    fontWeight: 700,
                    '& > span': {
                        fontSize: '1.25rem',
                        fontWeight: 500
                    }
                }}
            >
                <sup>$</sup>
                {price}
                <span>/Lifetime</span>
            </Typography>
        </Grid>
    )
}
