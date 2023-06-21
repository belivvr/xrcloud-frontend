import { memo, useEffect, useMemo, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, Drawer, Stack, useMediaQuery } from '@mui/material'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import MenuCard from './MenuCard'
import MenuList from '../MenuList'
import LogoSection from '../LogoSection'
import MiniDrawerStyled from './MiniDrawerStyled'
import Chip from 'ui-component/extended/Chip'

import { LAYOUT_CONST } from 'constant'
import useConfig from 'hooks/useConfig'
import { drawerWidth } from 'store/constant'

import { useDispatch, useSelector } from 'store'
import { openDrawer } from 'store/slices/menu'

import MenuOnly from '../Menu'

// ==============================|| SIDEBAR DRAWER ||============================== //

interface SidebarProps {
    isProject: boolean
}

const Sidebar = ({ isProject }: SidebarProps) => {
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))

    const dispatch = useDispatch()
    const { drawerOpen } = useSelector((state) => state.menu)

    const { layout, drawerType } = useConfig()

    const logo = useMemo(
        () => (
            <Box sx={{ display: 'flex', p: 2 }}>
                <LogoSection />
            </Box>
        ),
        []
    )

    const drawerContent = (
        <>
            {/* {isProject === false ? <MenuList /> : <MenuOnly />} */}
            <MenuList />
        </>
    )

    const drawerSX = {
        paddingLeft: drawerOpen ? '16px' : 0,
        paddingRight: drawerOpen ? '16px' : 0,
        marginTop: drawerOpen ? 0 : '20px'
    }

    const drawer = useMemo(
        () => (
            <>
                {matchDownMd ? (
                    <Box sx={drawerSX}>{drawerContent}</Box>
                ) : (
                    <PerfectScrollbar
                        component="div"
                        style={{
                            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                            ...drawerSX
                        }}
                    >
                        {drawerContent}
                    </PerfectScrollbar>
                )}
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchUpMd, drawerOpen, drawerType]
    )

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            {matchDownMd || (drawerType === LAYOUT_CONST.MINI_DRAWER && drawerOpen) ? (
                <Drawer
                    variant={matchUpMd ? 'persistent' : 'temporary'}
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => dispatch(openDrawer(!drawerOpen))}
                    sx={{
                        '& .MuiDrawer-paper': {
                            mt: matchDownMd ? 0 : 11,
                            zIndex: 1099,
                            width: drawerWidth,
                            background: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            borderRight: 'none'
                        }
                    }}
                    ModalProps={{ keepMounted: true }}
                    color="inherit"
                >
                    {matchDownMd && logo}
                    {drawer}
                </Drawer>
            ) : (
                <MiniDrawerStyled variant="permanent" open={drawerOpen}>
                    {logo}
                    {drawer}
                </MiniDrawerStyled>
            )}
        </Box>
    )
}

export default memo(Sidebar)
