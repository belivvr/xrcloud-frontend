import { useEffect, useMemo, FC, ReactNode, useState } from 'react'

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles'
import { Container, AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material'

// project imports
import Header from './Header'
import Sidebar from './Sidebar'
import HorizontalBar from './HorizontalBar'
import AuthGuard from 'utils/route-guard/AuthGuard'
import Breadcrumbs from 'ui-component/extended/Breadcrumbs'

import navigation from 'menu-items'
import { LAYOUT_CONST } from 'constant'
import useConfig from 'hooks/useConfig'
import { drawerWidth } from 'store/constant'
import { openDrawer } from 'store/slices/menu'
import { useDispatch, useSelector } from 'store'

// assets
import { IconChevronRight } from '@tabler/icons'
import { Footer } from 'components/custom/common/Footer'

interface Props {
    children: ReactNode
}

interface MainStyleProps {
    theme: Theme
    open: boolean
    layout: string
}

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, layout }: MainStyleProps) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...(!open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter + 200
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: layout === LAYOUT_CONST.VERTICAL_LAYOUT ? -(drawerWidth - 72) : '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginTop: 88
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px',
            marginTop: 88
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter + 200
        }),
        marginLeft: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? '20px' : 0,
        marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.up('md')]: {
            marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            marginTop: 88
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            marginTop: 88
        }
    })
}))

// ==============================|| MAIN LAYOUT ||============================== //

const LandingLayout: FC<Props> = ({ children }) => {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))

    const dispatch = useDispatch()
    const { drawerOpen } = useSelector((state) => state.menu)
    const { drawerType, container, layout } = useConfig()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
            dispatch(openDrawer(true))
        } else {
            dispatch(openDrawer(false))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerType])

    useEffect(() => {
        if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
            dispatch(openDrawer(true))
        }
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (matchDownMd) {
            dispatch(openDrawer(true))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd])

    const condition = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd

    const header = useMemo(
        () => (
            <Toolbar sx={{ p: condition ? '10px' : '16px' }}>
                <Header />
            </Toolbar>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [layout, matchDownMd]
    )

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* header */}
                {!loading && (
                    <AppBar
                        enableColorOnDark
                        position="fixed"
                        color="inherit"
                        elevation={0}
                        sx={{ bgcolor: theme.palette.background.default }}
                    >
                        {header}
                    </AppBar>
                )}

                {/* horizontal menu-list bar */}
                {layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd && <HorizontalBar />}

                {/* drawer */}
                {!loading && (layout === LAYOUT_CONST.VERTICAL_LAYOUT || matchDownMd) && <Sidebar />}

                {/* main content */}
                <Main theme={theme} open={drawerOpen} layout={layout}>
                    <Container maxWidth={container ? 'lg' : false} {...(!container && { sx: { px: { xs: 0 } } })}>
                        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                        {children}
                    </Container>
                </Main>
            </Box>
            {!loading && <Footer />}
        </div>
    )
}

export default LandingLayout
