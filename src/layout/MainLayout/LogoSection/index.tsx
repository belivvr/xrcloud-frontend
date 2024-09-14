import Link from 'Link'
// material-ui
import { Link as MuiLink } from '@mui/material'

// project imports
import { DASHBOARD_PATH } from 'config'

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <MuiLink
        component={Link}
        href={DASHBOARD_PATH}
        aria-label="theme-logo"
        style={{
            textDecoration: 'none',
            color: 'black',
            display: 'flex',
            justifyContent: 'flex-start',

            alignItems: 'flex-end',
            fontSize: '24px',
            fontWeight: '700',
            marginRight: '1em',
            marginTop: '1em'
        }}
    >
        {/* <Logo /> */}
        WEVENT
    </MuiLink>
)

export default LogoSection
