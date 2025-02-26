import { memo, useMemo } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, Drawer, useMediaQuery } from '@mui/material'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import MenuList from '../MenuList'
import LogoSection from '../LogoSection'
import MiniDrawerStyled from './MiniDrawerStyled'

import { LAYOUT_CONST } from 'constant'
import useConfig from 'hooks/useConfig'
import { drawerWidth } from 'store/constant'

import { useDispatch, useSelector } from 'store'
import { openDrawer } from 'store/slices/menu'
import Link from 'next/link'

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = () => {
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
                    <Link
                        href="https://github.com/belivvr"
                        target="_blank"
                        style={{ position: 'absolute', bottom: '10%', left: '40px', fontWeight: '600' }}
                    >
                        GITHUB
                    </Link>
                </Drawer>
            ) : (
                <MiniDrawerStyled variant="permanent" open={drawerOpen}>
                    {logo}
                    {drawer}
                    {drawerOpen && (
                        <Link
                            href="https://github.com/belivvr/xrcloud"
                            target="_blank"
                            style={{ position: 'absolute', bottom: '10%', left: '40px', fontWeight: '600' }}
                        >
                            GITHUB
                        </Link>
                    )}
                </MiniDrawerStyled>
            )}
        </Box>
    )
}

export default memo(Sidebar)
