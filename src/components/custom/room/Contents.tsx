import styled from '@emotion/styled'
//import { Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { Checkbox, TextField } from '@mui/material'
import React from 'react'
import { Room, Scene } from 'types/project'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

const Content = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #eee;
    position: relative;
`

const ContentTitle = styled.div`
    min-width: 200px;
    margin-right: 40%;
`

const ContentTextField = styled(TextField)`
    width: 100%;
`

interface Props {
    room: Room
    sceneList: Scene[]
}

export default function Contents({
    room,
    sceneList
}: //
Props) {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <>
            <Content>
                <ContentTitle>{localization['date-of-room-creation']}</ContentTitle>
                <ContentTextField
                    disabled={true}
                    id="outlined-required"
                    label={localization['date-of-room-creation']}
                    defaultValue={room.createdAt}
                />
            </Content>
            <Content>
                <ContentTitle>{localization['date-of-room-update']}</ContentTitle>
                <ContentTextField
                    disabled={true}
                    id="outlined-required"
                    label={localization['date-of-room-update']}
                    defaultValue={room.updatedAt}
                />
            </Content>
            <Content>
                <ContentTitle>{localization['room-id']}</ContentTitle>
                <ContentTextField disabled={true} id="outlined-required" label={localization['room-id']} defaultValue={room.id} />
            </Content>
            <Content>
                <ContentTitle>{localization['scene-id']}</ContentTitle>
                <ContentTextField disabled={true} id="outlined-required" label={localization['scene-id']} defaultValue={room.sceneId} />
            </Content>
            <Content>
                <ContentTitle>{localization['room-name']}</ContentTitle>
                <ContentTextField
                    disabled={true}
                    id="outlined-required"
                    label={localization['room-name']}
                    placeholder={localization['room-name']}
                    defaultValue={room.name}
                />
            </Content>
            <Content>
                <ContentTitle>{localization['custom-data']}</ContentTitle>
                <ContentTextField
                    disabled={true}
                    id="outlined-required"
                    label={localization['custom-data']}
                    defaultValue={room.customData}
                />
            </Content>
            <Content>
                <ContentTitle>{localization['room-size']}</ContentTitle>
                <ContentTextField
                    type="number"
                    disabled={true}
                    id="outlined-required"
                    label={localization['room-size']}
                    defaultValue={room.roomSize}
                />
            </Content>

            {/* <Content>
                <ContentTitle>{localization['change-scene']}</ContentTitle>
                <FormControl sx={{ m: 1, minWidth: 80, margin: 0 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">{localization['change-scene']}</InputLabel>
                    <Select color="primary" value={room.sceneId} label="Scene" autoWidth>
                        {sceneList.map((scene) => (
                            <MenuItem key={scene.id} value={scene.id}>
                                {scene.id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Content> */}

            <Content>
                <ContentTitle>{localization['auto-scale']}</ContentTitle>
                <Checkbox disabled={true} defaultChecked={room.autoScale} />
            </Content>
        </>
    )
}
