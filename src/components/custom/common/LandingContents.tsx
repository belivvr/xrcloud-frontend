import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface Props {
    title?: string
    description?: string
    style?: React.CSSProperties
}

export function LandingContents({ title, description, style }: Props) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: 'calc(100vh - 268px)',
                lineHeight: 1.5,
                textAlign: 'center',
                whiteSpace: 'pre-line',
                ...style
            }}
        >
            <div>{title}</div>
            <div>{description}</div>
            <Button style={{ textTransform: 'none' }}>
                <Link style={{ textDecoration: 'underline' }} target={'_blank'} href={'https://belivvr.com'}>
                    https://belivvr.com
                </Link>
            </Button>
        </div>
    )
}
