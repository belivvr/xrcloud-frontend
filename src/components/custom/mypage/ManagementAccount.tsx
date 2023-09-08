import { Button, TextField } from '@mui/material'
import useAuth from 'hooks/useAuth'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function ManagementAccount() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const { locale } = useConfig()
    const { updatePassword, withdraw } = useAuth()
    const localization = useLocalization(locale)
    const router = useRouter()

    const checkSamePassword = (newPass: string, repeatPass: string) => newPass === repeatPass

    const resetPasswords = () => {
        setOldPassword('')
        setNewPassword('')
        setRepeatPassword('')
    }

    const changePassword = async () => {
        if (!checkSamePassword(newPassword, repeatPassword)) {
            return alert('변경할 비밀번호를 동일하게 입력해주세요')
        }

        try {
            await updatePassword(oldPassword, newPassword)
            resetPasswords()
            return alert('비밀번호가 변경되었습니다')
        } catch (e: any) {
            if (e.response.status === 401) {
                return alert('비밀번호가 일치하지 않습니다')
            }
        }
    }

    const withdrawUser = async () => {
        try {
            await withdraw()
            router.push('/')
        } catch (e: any) {
            console.log(e.response)
        }
    }

    return (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
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
                <TextField
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type="password"
                    fullWidth
                    placeholder={localization['change-password-ex']}
                    style={{ width: '100%' }}
                />
                <TextField
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    fullWidth
                    placeholder={localization['enter-change-password']}
                    style={{ width: '100%' }}
                />
                <TextField
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    type="password"
                    fullWidth
                    placeholder={localization['re-enter-change-password']}
                    style={{ width: '100%' }}
                />
                <div>
                    <Button onClick={changePassword} variant="outlined" style={{ width: 'fit-content', height: '48px' }}>
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
                    <Button onClick={withdrawUser} style={{ width: 'fit-content', height: '48px' }} variant="outlined" color="error">
                        {localization.withdraw}
                    </Button>
                </div>
            </div>
        </div>
    )
}
