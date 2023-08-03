import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { optionList } from 'config'
import React from 'react'
import { PricePlan } from 'types/config'

interface Props {
    plan: PricePlan
}

export function CheckOptions({ plan }: Props) {
    const theme = useTheme()

    return (
        <Grid item xs={12}>
            <List
                sx={{
                    m: 0,
                    p: 0,
                    '&> li': {
                        px: 0,
                        py: 0.625,
                        '& svg': {
                            fill: theme.palette.success.dark
                        }
                    }
                }}
                component="ul"
            >
                {optionList.map((list, i) => (
                    <React.Fragment key={i}>
                        <ListItem
                            sx={
                                !plan.permission.includes(i)
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
                            <ListItemText primary={list} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Grid>
    )
}
