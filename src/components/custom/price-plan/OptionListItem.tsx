import { Divider, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'

import React from 'react'
import { PricePlan } from 'types/config'

interface Props {
    index: number
    plan: PricePlan
    list: string
}

export function OptionListItem({ index, plan, list }: Props) {
    const theme = useTheme()

    return (
        <React.Fragment>
            <ListItem
                sx={
                    !plan.permission.includes(index)
                        ? {
                              opacity: '0.4',
                              '& >div> svg': {
                                  fill: theme.palette.secondary.light
                              }
                          }
                        : {}
                }
            >
                <ListItemIcon>
                    <CheckTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                </ListItemIcon>
                <ListItemText style={{ whiteSpace: 'break-spaces' }} primary={list} />
            </ListItem>
            <Divider />
        </React.Fragment>
    )
}
