import { useEffect, useRef, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material'

// third-party
import { FormattedMessage } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import Transitions from 'ui-component/extended/Transitions'
import UpgradePlanCard from './UpgradePlanCard'
import useAuth from 'hooks/useAuth'

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons'
import useConfig from 'hooks/useConfig'
import { useRouter } from 'next/router'

const User1 = '/assets/images/users/user-round.svg'

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme()
    const { borderRadius } = useConfig()
    // const navigate = useNavigate();

    const [sdm, setSdm] = useState(true)
    const [value, setValue] = useState('')
    const [notification, setNotification] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const { logout, user } = useAuth()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef<any>(null)
    const handleLogout = async () => {
        try {
            logout()
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem('refreshToken')
            router.push('/login')
        } catch (err) {
            console.error(err)
        }
    }

    const handleClose = (event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpen(false)
    }

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number, route: string = '') => {
        setSelectedIndex(index)
        handleClose(event)

        // if (route && route !== '') {
        //     navigate(route);
        // }
    }
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
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
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        alt="user-images"
                    />
                }
                label={<IconSettings stroke={1.5} size="24px" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                aria-label="user-account"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                            <Box sx={{ p: 2, pt: 0 }}>
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={() => {
                                                            router.push('/mypage')
                                                        }}
                                                    >
                                                        <ListItemIcon>
                                                            <IconUser stroke={1.5} size="20px" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body2">
                                                                    <FormattedMessage id="Mypage" />
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 4}
                                                        onClick={handleLogout}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="20px" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body2">
                                                                    <FormattedMessage id="logout" />
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </>
    )
}

export default ProfileSection
