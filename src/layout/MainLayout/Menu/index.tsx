import React from 'react'
import menuItem from 'menu-items'
import NavGroup from '../MenuList/NavGroup'
import { useTheme } from '@mui/material/styles'
import { LAYOUT_CONST } from 'constant'
import { NavItemType } from 'types'
import { HORIZONTAL_MAX_ITEM } from 'config'
import { Typography, useMediaQuery } from '@mui/material'
import useConfig from 'hooks/useConfig'

const MenuOnly = () => {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
    const { layout } = useConfig()

    const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null

    let lastItemIndex = menuItem.item.length - 1
    let remItems: NavItemType[] = []
    let lastItemId: string

    if (lastItem && lastItem < menuItem.item.length) {
        lastItemId = menuItem.item[lastItem - 1].id!
        lastItemIndex = lastItem - 1
        remItems = menuItem.item.slice(lastItem - 1, menuItem.item.length).map((i) => ({
            title: i.title,
            elements: i.children
        }))
    }

    const navItem = menuItem.item.slice(0, lastItemIndex + 1).map((i) => {
        switch (i.type) {
            case 'group':
                return <NavGroup key={i.id} item={i} lastItem={lastItem!} remItems={remItems} lastItemId={lastItemId} />
            default:
                return (
                    <Typography key={i.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                )
        }
    })

    return <div>{navItem}</div>
}

export default MenuOnly
