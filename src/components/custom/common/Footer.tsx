import { useTheme } from '@mui/material'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import Link from 'Link'
import React from 'react'

export function Footer() {
    const theme = useTheme()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                zIndex: 200000,
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
                <div style={{ display: 'flex', gap: '124px', fontWeight: 700 }}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        target={'_blank'}
                        href="https://belivvr.notion.site/578e4cc99c4b4127a1a789be096786c4?pvs=4"
                    >
                        {localization['terms-of-use']}
                    </Link>
                    <Link
                        style={{ textDecoration: 'none' }}
                        target={'_blank'}
                        href="https://belivvr.notion.site/18ef753bf75342acb85637310a24d9c7?pvs=4"
                    >
                        {localization['privacy-policy']}
                    </Link>
                </div>
                <div>{localization['business-license']}</div>
                <div>{localization['telemarketing-business-license-number']}</div>
                <div>{localization['belivvr-address-contents']}</div>
                <div>{localization['company-number']}</div>
            </div>
        </div>
    )
}
