import { useEffect, useRef, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { AppBar, Box, IconButton, ClickAwayListener, Grid, Paper, Popper, Toolbar, useMediaQuery, Button } from '@mui/material'

// project imports
import LocalizationSection from '../LocalizationSection'
import Transitions from 'ui-component/extended/Transitions'

// assets
import { IconDotsVertical } from '@tabler/icons'
import ProfileSection from '../ProfileSection'
import useAuth from 'hooks/useAuth'
import router from 'next/router'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

// ==============================|| MOBILE HEADER ||============================== //

const MobileSection = () => {
    const theme = useTheme()
    const matchMobile = useMediaQuery(theme.breakpoints.down('md'))
    const { user } = useAuth()
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    const [open, setOpen] = useState(false)
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef<any>(null)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpen(false)
    }

    const prevOpen = useRef(open)
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus()
        }

        prevOpen.current = open
    }, [open])

    return (
        <>
            <Box component="span" ref={anchorRef} sx={{ mt: 1, ml: 1 }}>
                <IconButton
                    sx={{ color: theme.palette.mode === 'dark' ? 'primary.main' : 'inherit', ml: 0.5, cursor: 'pointer' }}
                    onClick={handleToggle}
                >
                    <IconDotsVertical
                        stroke={1.5}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        style={{ fontSize: '1.5rem' }}
                    />
                </IconButton>
            </Box>

            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{ width: '100%', zIndex: 1 }}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, matchMobile ? 30 : 10]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions type="zoom" in={open} {...TransitionProps} sx={{ transformOrigin: 'top right' }}>
                            <Paper>
                                {open && (
                                    <AppBar
                                        color="inherit"
                                        sx={{
                                            [theme.breakpoints.down('md')]: {
                                                background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
                                            }
                                        }}
                                    >
                                        <Toolbar sx={{ pt: 2.75, pb: 2.75 }}>
                                            <Grid container gap={4} alignItems="center">
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
                                            </Grid>
                                        </Toolbar>
                                    </AppBar>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    )
}

export default MobileSection
