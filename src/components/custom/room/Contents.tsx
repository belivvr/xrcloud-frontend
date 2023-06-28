import styled from '@emotion/styled'
import { Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
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
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const localizedFields = fields.map((field) => ({
        ...field,
        title: localization[field.title] || field.title,
        label: localization[field.label] || field.label
    }))

    return (
        <>
            {localizedFields.map((field) => (
                <Content key={field.id}>
                    <ContentTitle>{field.title}</ContentTitle>
                    <ContentTextField disabled={field.isDisabled} id="outlined-required" label={field.label} defaultValue={field.label} />
                </Content>
            ))}

            <Content>
                <ContentTitle>{localization['change-scene']}</ContentTitle>
                <FormControl sx={{ m: 1, minWidth: 80, margin: 0 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">{localization['change-scene']}</InputLabel>
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
                <ContentTitle>{localization['auto-scale']}</ContentTitle>
                <Checkbox />
            </Content>
        </>
    )
}
