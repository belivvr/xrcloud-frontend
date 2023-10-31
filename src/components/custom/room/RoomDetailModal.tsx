import React from 'react'
import styled from '@emotion/styled'
import CloseIcon from '@mui/icons-material/Close'
import { Button, TextField, useMediaQuery, useTheme } from '@mui/material'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { Room } from 'types/project'

const Image = styled.img`
    width: 100%;
    height: 30%;
    object-fit: contain;
    margin-bottom: 16px;
    transition: all 0.15s ease;
    border: 1px solid #eee;
    &:hover {
        background-color: rgba(63, 81, 181, 0.04);
    }
`

interface Props {
    roomType: string
    selectedRoom: Room | undefined
    selectedRoomName: string
    selectedRoomReturnUrl: string
    setSelectedRoomName: React.Dispatch<React.SetStateAction<string>>
    setRoomReturnUrl: React.Dispatch<React.SetStateAction<string>>
    handleSelectRoomDefault: () => void
    handleSelectRoomType: (event: { target: { value: string } }) => void
    handleEnterRoomByHost: () => void
    handleEnterRoomByGuest: () => void
    handleUpdateRoom: () => void
}

export default function RoomDetailModal({
    roomType,
    selectedRoom,
    selectedRoomName,
    selectedRoomReturnUrl,
    setSelectedRoomName,
    handleSelectRoomDefault,
    handleSelectRoomType,
    setRoomReturnUrl,
    handleEnterRoomByHost,
    handleEnterRoomByGuest,
    handleUpdateRoom
}: Props) {
    const theme = useTheme()
    const { locale: configLocale } = useConfig()
    const localization = useLocalization(configLocale)
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <div
            style={{
                position: 'fixed',
                right: 0,
                width: matchDownMd ? '100%' : '30%',
                height: '80%',
                backgroundColor: '#fff',
                zIndex: selectedRoom ? 1000 : 0,
                padding: '1rem',
                boxShadow: '0 0 8px 0 rgba(0,0,0,0.2)',
                opacity: selectedRoom ? 1 : 0,
                overflow: 'scroll'
            }}
        >
            <div
                style={{
                    height: '3rem',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '1rem'
                }}
            >
                <CloseIcon onClick={() => handleSelectRoomDefault()} style={{ cursor: 'pointer' }} fontSize="large" />
            </div>
            <div style={{ height: 'calc(100% - 15rem)', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'scroll' }}>
                <Image src={selectedRoom?.thumbnailUrl} alt={selectedRoom?.thumbnailUrl} />
                <TextField
                    inputProps={{
                        sx: {
                            fontSize: '16px',
                            '::placeholder': {
                                fontSize: '18px'
                            }
                        }
                    }}
                    focused
                    variant="standard"
                    value={selectedRoomName}
                    label="Name"
                    placeholder="Room Name"
                    onChange={(e) => setSelectedRoomName(e.target.value)}
                />
                <div>
                    <span>ID ) </span>
                    <span style={{ fontWeight: 700 }}>{selectedRoom?.id}</span>
                </div>
                <div>
                    <span>HOST URL ) </span>
                    <span style={{ fontWeight: 700 }}>{selectedRoom?.roomUrl.host}</span>
                </div>
                <div>
                    <span>GUEST URL ) </span>
                    <span style={{ fontWeight: 700 }}>{selectedRoom?.roomUrl.guest}</span>
                </div>
                <TextField
                    inputProps={{
                        sx: {
                            fontSize: '16px',
                            '::placeholder': {
                                fontSize: '18px'
                            }
                        }
                    }}
                    focused
                    variant="standard"
                    value={selectedRoomReturnUrl}
                    label="Return URL"
                    placeholder="다시 돌아올 Return URL을 입력하세요."
                    onChange={(e) => setRoomReturnUrl(e.target.value)}
                />
                <Button
                    onClick={() => handleUpdateRoom()}
                    style={{
                        position: 'absolute',
                        width: 'calc(100% - 32px)',
                        height: '3rem',
                        bottom: '100px',
                        left: '16px',
                        zIndex: '10',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: 600
                    }}
                    variant="contained"
                    color="info"
                    disableElevation
                >
                    {localization['room-update']}
                </Button>
                <Button
                    onClick={() => handleEnterRoomByHost()}
                    style={{
                        position: 'absolute',
                        width: 'calc(100% - 32px)',
                        height: '3rem',
                        bottom: '32px',
                        right: '16px',
                        zIndex: '10',
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none'
                    }}
                    variant="contained"
                    disableElevation
                >
                    {localization['room-enter-host']}
                </Button>
            </div>
        </div>
    )
}
