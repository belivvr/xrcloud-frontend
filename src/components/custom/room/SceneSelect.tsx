/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled'
import { ListItemText, MenuItem, Select, SelectChangeEvent, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { Scene } from 'types/project'

const MenuItemWrapper = styled(Select)`
    div {
        display: flex;
    }
`

interface Props {
    sceneId: string
    sceneList: Scene[]
    onChange: (e: SelectChangeEvent<any>) => any
}

export function SceneSelect({ sceneId, sceneList, onChange }: Props) {
    return (
        <TableRow>
            <TableCell>Scene 선택</TableCell>
            <TableCell>
                <MenuItemWrapper id="scene" value={sceneId} onChange={onChange}>
                    {sceneList.map(({ id, name, thumbnailUrl }) => {
                        return (
                            <MenuItem style={{ display: 'flex', justifyContent: 'center' }} key={id} value={id}>
                                <img
                                    style={{
                                        width: '200px',
                                        objectFit: 'cover'
                                    }}
                                    src={thumbnailUrl}
                                    alt={thumbnailUrl}
                                />
                                <ListItemText
                                    primaryTypographyProps={{ style: { fontSize: '18px' } }}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}
                                >
                                    {name}
                                </ListItemText>
                            </MenuItem>
                        )
                    })}
                </MenuItemWrapper>
            </TableCell>
        </TableRow>
    )
}
