// material-ui
import { useTheme } from '@mui/material/styles'
import { Avatar, Box, Button, useMediaQuery } from '@mui/material'

// project imports
import { LAYOUT_CONST } from 'constant'
import useConfig from 'hooks/useConfig'
import MobileSection from './MobileSection'
import ProfileSection from './ProfileSection'
import LocalizationSection from './LocalizationSection'

import { useDispatch, useSelector } from 'store'
import { openDrawer } from 'store/slices/menu'

// assets
import { IconMenu2 } from '@tabler/icons'
import router from 'next/router'
import Link from 'next/link'
import useAuth from 'hooks/useAuth'
import { useLocalization } from 'hooks/useLocalization'
import { useEffect, useState } from 'react'

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme()

    const dispatch = useDispatch()
    const { drawerOpen } = useSelector((state) => state.menu)

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'))
    const { layout, locale } = useConfig()
    const { user } = useAuth()
    const localization = useLocalization(locale)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return <></>
    }

    return (
        <Box style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box
                    onClick={() => router.push('/')}
                    component="span"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        fontSize: '24px',
                        fontWeight: '700',
                        marginRight: '1em',
                        cursor: 'pointer'
                    }}
                >
                    {/* <LogoSection /> */}
                    XRCLOUD
                </Box>
                {layout === LAYOUT_CONST.VERTICAL_LAYOUT}
                {(layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd)) && (
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            overflow: 'hidden',
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                            }
                        }}
                        onClick={() => dispatch(openDrawer(!drawerOpen))}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="20px" />
                    </Avatar>
                )}
            </Box>

            <Box sx={{ display: matchDownMd ? 'none' : 'flex', gap: '50px' }}>
                <Button
                    sx={{
                        alignItems: 'center',
                        transition: 'all .2s ease-in-out',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        fontWeight: 600
                    }}
                    component={Link}
                    href={`${locale}/news/`}
                >
                    {localization['header-news']}
                </Button>
                <Button
                    sx={{
                        alignItems: 'center',
                        transition: 'all .2s ease-in-out',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        fontWeight: 600
                    }}
                    component={Link}
                    href="/price-plan"
                >
                    {localization['header-price']}
                </Button>
                <Button
                    sx={{
                        alignItems: 'center',
                        transition: 'all .2s ease-in-out',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        fontWeight: 600
                    }}
                    component={Link}
                    href={`${process.env.NEXT_PUBLIC_API_SERVER}/docs/${locale}`}
                    target="_blank"
                >
                    {localization['header-api']}
                </Button>
                <Button
                    sx={{
                        alignItems: 'center',
                        transition: 'all .2s ease-in-out',
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                        fontWeight: 600
                    }}
                    component={Link}
                    href="https://discord.gg/h7wr75AuDd"
                    target="_blank"
                >
                    {localization['header-community']}
                </Button>
            </Box>
            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'flex', sm: 'flex' }, alignItems: 'center', marginRight: '24px', gap: '20px' }}>
                {!matchDownSm && (
                    <>
                        {window.location.pathname === '/ko' ||
                        window.location.pathname === '/en' ||
                        window.location.pathname === '/' ? null : (
                            <LocalizationSection />
                        )}
                        {user ? (
                            <ProfileSection />
                        ) : (
                            <Button
                                style={{
                                    fontWeight: 600
                                }}
                                onClick={() => router.push('/login')}
                            >
                                {localization.login}
                            </Button>
                        )}
                    </>
                )}
            </Box>

            {/* profile */}

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </Box>
    )
}

export default Header
