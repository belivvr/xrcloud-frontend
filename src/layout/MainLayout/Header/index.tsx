// material-ui
import { useTheme } from '@mui/material/styles'
import { Avatar, Box, useMediaQuery } from '@mui/material'

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

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme()

    const dispatch = useDispatch()
    const { drawerOpen } = useSelector((state) => state.menu)

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
    const { layout } = useConfig()

    return (
        <>
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
                    onClick={() => router.push('/projects')}
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
                    XRCloud
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

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '24px' }}>
                <LocalizationSection />
            </Box>

            {/* profile */}

            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    )
}

export default Header
