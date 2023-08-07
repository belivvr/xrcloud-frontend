import { ReactElement, useEffect } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material'
import Link from '../../Link'

// project imports
import LAYOUT from 'constant'
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import AuthWrapper1 from 'components/authentication/AuthWrapper1'
import AuthCardWrapper from 'components/authentication/AuthCardWrapper'
import AuthLogin from 'components/authentication/auth-forms/AuthLogin'

import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import useChoicedProject from 'hooks/useChoicedProject'
import styled from '@emotion/styled'

// ================================|| AUTH3 - LOGIN ||================================ //

const LinkTitle = styled(Link)`
    :hover {
        color: #d84315;
    }
`

const Login = () => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { choicedProject, choicedScene, setChoicedProject, setChoicedScene } = useChoicedProject()

    useEffect(() => {
        if (choicedProject) setChoicedProject(undefined)
        if (choicedScene) setChoicedScene(undefined)

        localStorage.removeItem('adminId')
    }, [])

    return (
        <Page title="Login">
            <AuthWrapper1>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item sx={{ mb: 1 }}>
                                            <LinkTitle href="/" aria-label="theme-logo" sx={{ textDecoration: 'none', color: '#000' }}>
                                                {/* <Logo /> */}
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        fontSize: '24px',
                                                        fontWeight: '700'
                                                    }}
                                                >
                                                    {/* <LogoSection /> */}
                                                    XRCLOUD
                                                </Box>
                                            </LinkTitle>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                direction={matchDownSM ? 'column-reverse' : 'row'}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Grid item>
                                                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                        <Typography
                                                            color={theme.palette.secondary.main}
                                                            gutterBottom
                                                            variant={matchDownSM ? 'h4' : 'h3'}
                                                        >
                                                            {localization.welcome}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            fontSize="16px"
                                                            textAlign={matchDownSM ? 'center' : 'inherit'}
                                                        >
                                                            {localization['enter-your-credentials']}
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthLogin />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    component={Link}
                                                    href="/register"
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    {localization['dont-account']}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid> */}
                </Grid>
            </AuthWrapper1>
        </Page>
    )
}

Login.getLayout = function getLayout(page: ReactElement) {
    return <Layout variant={LAYOUT.noauth}>{page}</Layout>
}

export default Login
