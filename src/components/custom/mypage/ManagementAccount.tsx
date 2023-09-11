import { Button, TextField } from '@mui/material'
import useAuth from 'hooks/useAuth'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import React, { useState } from 'react'
import BasicModal from '../common/BasicModal'

export default function ManagementAccount() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const { locale } = useConfig()
    const { updatePassword, withdraw, logout } = useAuth()
    const localization = useLocalization(locale)

    const [modalOpen, setModalOpen] = useState(false)
    const handleOpen = () => setModalOpen(true)
    const handleClose = () => setModalOpen(false)

    const checkSamePassword = (newPass: string, repeatPass: string) => newPass === repeatPass

    const resetPasswords = () => {
        setOldPassword('')
        setNewPassword('')
        setRepeatPassword('')
    }

    const changePassword = async () => {
        if (!oldPassword || !newPassword || !repeatPassword) {
            return alert(localization['error-alert-change-password'])
        }

        if (!checkSamePassword(newPassword, repeatPassword)) {
            return alert(localization['error-alert-change-password2'])
        }

        try {
            await updatePassword(oldPassword, newPassword)
            resetPasswords()
            return alert(localization['alert-change-password'])
        } catch (e: any) {
            if (e.response.status === 401) {
                return alert(localization['error-alert-change-password3'])
            }

            if (e.response.status === 400) {
                return alert(localization['error-alert-change-password4'])
            }
        }
    }

    const withdrawUser = async () => {
        try {
            await withdraw()
            logout()
        } catch (e: any) {
            console.log(e.response)
        }
    }

    return (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <BasicModal
                mainText={localization['withdraw-contents2']}
                buttonLeftText={localization['delete-project-modal-left-button']}
                buttonRightText={localization['delete-project-modal-right-button']}
                open={modalOpen}
                handleClose={handleClose}
                handleRightButton={withdrawUser}
            />
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
                    <Button onClick={handleOpen} style={{ width: 'fit-content', height: '48px' }} variant="outlined" color="error">
                        {localization.withdraw}
                    </Button>
                </div>
            </div>
        </div>
    )
}
