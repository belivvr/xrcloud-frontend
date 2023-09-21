import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import CloseIcon from '@mui/icons-material/Close'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
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
    handleEnterRoom: () => void
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
    handleEnterRoom
}: Props) {
    const { locale: configLocale } = useConfig()
    const localization = useLocalization(configLocale)

    return (
        <div
            style={{
                position: 'absolute',
                right: selectedRoom ? '0%' : '-25%',
                width: '30rem',
                height: '80%',
                backgroundColor: '#fff',
                zIndex: '1000',
                padding: '1rem',
                boxShadow: '0 0 8px 0 rgba(0,0,0,0.2)',
                opacity: selectedRoom ? 1 : 0,
                overflow: 'scroll',
                transition: 'all 0.3s ease'
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
            <Image src={selectedRoom?.thumbnailUrl} alt={selectedRoom?.thumbnailUrl} />
            <div style={{ height: 'calc(100% - 20rem)', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'scroll' }}>
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
                    <span>URL ) </span>
                    <span style={{ fontWeight: 700 }}>{selectedRoom?.roomUrl}</span>
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
                {/* <FormControl variant="standard">
                    <InputLabel id="demo-customized-select-label">Room Type</InputLabel>
                    <Select
                        label="Room Type"
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={roomType}
                        onChange={handleSelectRoomType}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'public'}>Public</MenuItem>
                        <MenuItem value={'private'}>Private</MenuItem>
                    </Select>
                </FormControl> */}
                <div></div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '5rem',
                    bottom: '0',
                    backgroundColor: '#fff'
                }}
            />
            <Button
                onClick={() => handleEnterRoom()}
                style={{ position: 'absolute', width: 'calc(100% - 32px)', height: '3rem', bottom: '32px', left: '16px', zIndex: '10' }}
                variant="contained"
                disableElevation
            >
                {localization['room-enter']}
            </Button>
        </div>
    )
}
