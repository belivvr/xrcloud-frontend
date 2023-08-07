import { ReactElement, useEffect } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { Footer } from 'components/custom/common/Footer'
import MainCard from 'ui-component/cards/MainCard'
import { NeedChoiceProject } from 'components/custom/common'
import { LandingContents } from 'components/custom/common/LandingContents'

const Landing = () => {
    const { locale, onChangePresetColor } = useConfig()
    const localization = useLocalization(locale)

    useEffect(() => {
        onChangePresetColor('theme6')
    }, [])

    return (
        <Page title={localization.landing}>
            <MainCard title={localization.landing}>
                {/* <NeedChoiceProject style={{ fontSize: '24px', padding: '72px' }} title={localization['landing-contents']} /> */}
                <LandingContents
                    style={{ fontSize: '24px', padding: '72px' }}
                    title={localization['landing-title']}
                    description={localization['landing-description']}
                />
            </MainCard>
            <Footer />
        </Page>
    )
}

Landing.getLayout = function getLayout(page: ReactElement) {
    return <Layout variant="landing">{page}</Layout>
}

export default Landing
