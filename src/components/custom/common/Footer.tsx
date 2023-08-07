import styled from '@emotion/styled'
import { Button, useTheme } from '@mui/material'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import React from 'react'
const FooterRouters = styled.div`
    button {
        color: #1976d2;
        min-width: 120px;
    }
`
export function Footer() {
    const theme = useTheme()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <div
            style={{
                position: 'absolute',
                bottom: '-290px',
                left: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: 10000,
                padding: '32px 0',
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#fff',
                borderTop: '1px solid #eef2e6'
            }}
        >
            <div
                style={{
                    width: '80%',
                    marginTop: '0px',
                    display: 'flex',
                    gap: '16px',
                    flexDirection: 'column',
                    fontSize: '14px'
                }}
            >
                <div>{localization['business-license']}</div>
                <div>{localization['telemarketing-business-license-number']}</div>
                <div>{localization['belivvr-address-contents']}</div>
                <div>{localization['company-number']}</div>
            </div>
        </div>
    )
}
