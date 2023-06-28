import styled from '@emotion/styled'
import { Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React from 'react'
import { Room, Scene } from 'types/project'

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

interface Field {
    title: string
    id: string
    label: string
    isDisabled: boolean
}

interface Props {
    room: Room
    fields: Field[]
    sceneList: Scene[]
    selectChange: (event: SelectChangeEvent) => void
}

export default function Contents({
    room,
    fields,
    sceneList,
    selectChange
}: //
Props) {
    return (
        <>
            {fields.map((field) => (
                <Content key={field.id}>
                    <ContentTitle>{field.title}</ContentTitle>
                    <ContentTextField disabled={field.isDisabled} id="outlined-required" label={field.label} defaultValue={field.label} />
                </Content>
            ))}

            <Content>
                <ContentTitle>projects.hubs.rooms.scene</ContentTitle>
                <FormControl sx={{ m: 1, minWidth: 80, margin: 0 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Scene</InputLabel>
                    <Select color="primary" value={room.sceneId} label="Scene" autoWidth onChange={selectChange}>
                        {sceneList.map((scene) => (
                            <MenuItem key={scene.id} value={scene.id}>
                                {scene.id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Content>

            <Content>
                <ContentTitle>projects.hubs.rooms.auto-scale</ContentTitle>
                <Checkbox />
            </Content>
        </>
    )
}
