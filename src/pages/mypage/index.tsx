import React, { ReactElement, useEffect, useState } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import Layout from 'layout'
import { Button, CardActions, CardContent, Divider, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { TabPanel, UserProfile } from 'components/custom/mypage'
import AnimateButton from 'ui-component/extended/AnimateButton'
import { allyProps } from 'utils/allyProps'

import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'
import TuneIcon from '@mui/icons-material/Tune'
import useConfig from 'hooks/useConfig'
import useAuth from 'hooks/useAuth'
import { useLocalization } from 'hooks/useLocalization'

const Mypage = () => {
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const [email, setEmail] = useState('')
    const { borderRadius } = useConfig()
    const { receivedApiKey, getProfile, genrateApiKey } = useAuth()
    const [loading, setLoading] = useState(true)
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    const tabsOption = [
        {
            label: localization.profile,
            icon: <PersonOutlineTwoToneIcon />,
            caption: localization['profile-caption']
        },
        {
            label: localization.account,
            icon: <TuneIcon />,
            caption: localization['account-caption']
        }
    ]

    useEffect(() => {
        ;(async () => {
            const profile = await getProfile()
            setEmail(profile.email)
            setLoading(false)
        })()
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const style = {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none'
        },
        '& button': {
            color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            py: 1.5,
            px: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start',
            borderRadius: `${borderRadius}px`
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
        },
        '& button > svg': {
            marginBottom: '0px !important',
            marginRight: 1.25,
            marginTop: 1.25,
            height: 20,
            width: 20
        },
        '& button > div > span': {
            display: 'block'
        },
        '& > div > span': {
            display: 'none'
        }
    }

    if (loading) {
        return <></>
    }

    return (
        <Page title="My page">
            <MainCard title="My page">
                <Grid container>
                    <Grid item xs={12} lg={4}>
                        <CardContent>
                            <Tabs value={value} onChange={handleChange} orientation="vertical" variant="scrollable" sx={{ ...style }}>
                                {tabsOption.map((tab, index) => (
                                    <Tab
                                        key={index}
                                        icon={tab.icon}
                                        label={
                                            <Grid container direction="column">
                                                <Typography variant="subtitle1" color="inherit">
                                                    {tab.label}
                                                </Typography>
                                                <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                                    {tab.caption}
                                                </Typography>
                                            </Grid>
                                        }
                                        {...allyProps(index)}
                                    />
                                ))}
                            </Tabs>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <CardContent
                            sx={{
                                borderLeft: '1px solid',
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[200],
                                height: '100%'
                            }}
                        >
                            <TabPanel value={value} index={0}>
                                <UserProfile email={email} receivedApiKey={receivedApiKey} genrateApiKey={genrateApiKey} />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                asfafs
                            </TabPanel>
                        </CardContent>
                    </Grid>
                </Grid>
                <Divider />
            </MainCard>
        </Page>
    )
}

Mypage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Mypage
