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
                zIndex: 1099,
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
                        href="https://belivvr.notion.site/XRCLOUD-1-0-9505c89fe1cf480f83e1b5a2fb3512eb"
                    >
                        {localization['terms-of-use']}
                    </Link>
                    <Link
                        style={{ textDecoration: 'none' }}
                        target={'_blank'}
                        href="https://www.notion.so/belivvr/3d4b078619904e51b3a9f44d844f4e79"
                    >
                        {localization['privacy-policy']}
                    </Link>
                    <a style={{ color: '#3f51b5' }} href="/assets/XRCLOUD1.0_GS인증_제품설명서_1120.hwp" download>
                        {localization.manual}
                    </a>
                </div>
                <div>{localization['business-license']}</div>
                <div>{localization['telemarketing-business-license-number']}</div>
                <div>{localization['belivvr-address-contents']}</div>
                <div>{localization['company-number']}</div>
                <div>{localization['company-name']}</div>
                <div>{localization.copyright}</div>
            </div>
        </div>
    )
}
