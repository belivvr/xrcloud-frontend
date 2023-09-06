import { Button, TextField } from '@mui/material'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import React from 'react'

export default function ManagementAccount() {
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    border: '1px solid #eee',
                    padding: '1.5rem',
                    borderRadius: '8px'
                }}
            >
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{localization['change-password']}</div>
                <TextField type="password" fullWidth placeholder={localization['change-password-ex']} style={{ width: '100%' }} />
                <TextField type="password" fullWidth placeholder={localization['enter-change-password']} style={{ width: '100%' }} />
                <TextField type="password" fullWidth placeholder={localization['re-enter-change-password']} style={{ width: '100%' }} />
                <div>
                    <Button variant="outlined" style={{ width: 'fit-content', height: '48px' }}>
                        {localization['change-password']}
                    </Button>
                </div>
            </div>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    gap: '1rem',
                    border: '1px solid #eee',
                    padding: '1.5rem',
                    borderRadius: '8px'
                }}
            >
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{localization.withdraw}</div>
                <div style={{ whiteSpace: 'pre-line' }}>{localization['withdraw-contents']}</div>
                <div>
                    <Button style={{ width: 'fit-content' }} variant="outlined" color="error">
                        {localization.withdraw}
                    </Button>
                </div>
            </div>
        </div>
    )
}
