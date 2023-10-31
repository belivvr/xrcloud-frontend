import React, { ReactElement, useEffect, useState } from 'react'
import Page from 'ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import Layout from 'layout'
import { Grid } from '@mui/material'
import useAuth from 'hooks/useAuth'
import TabsWrapper from 'components/custom/mypage/TabsWrapper'
import TabContentsWrapper from 'components/custom/mypage/TabContentsWrapper'

const Mypage = () => {
    const [email, setEmail] = useState('')
    const { receivedApiKey, getProfile } = useAuth()
    const [loading, setLoading] = useState(true)

    const [value, setValue] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        ;(async () => {
            const profile = await getProfile()
            setEmail(profile.email)
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return <></>
    }

    return (
        <Page style={{ height: '100%' }} title="My page">
            <MainCard style={{ height: '100%' }} title="My page">
                <Grid container style={{ marginBottom: '1.5rem' }}>
                    <TabsWrapper value={value} handleChange={handleChange} />
                    <TabContentsWrapper value={value} email={email} receivedApiKey={receivedApiKey} />
                </Grid>
                {/* <Divider /> */}
            </MainCard>
        </Page>
    )
}

Mypage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Mypage
