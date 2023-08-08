import { Grid, Typography } from '@mui/material'
import React from 'react'

interface Props {
    price: string
}

export function PriceTag({ price }: Props) {
    return (
        <Grid item xs={12}>
            <Typography
                component="div"
                variant="body2"
                padding="12px"
                style={{ backgroundColor: '#e8eaf6', borderRadius: '18px', marginTop: '12px' }}
            >
                <div style={{ fontSize: '24px', marginTop: '12px', fontWeight: 700 }}>{price === '0' ? 'Free' : `$${price}`}</div>
                <span style={{ fontSize: '12px' }}>per month</span>
            </Typography>
        </Grid>
    )
}
