import { ReactElement } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { NeedChoiceProject } from 'components/custom/common'
import { useLocalization } from 'hooks/useLocalization'
import useConfig from 'hooks/useConfig'

const Permissions = () => {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <Page title="Permissions">
            <MainCard title="Permissions">
                <NeedChoiceProject title={localization['permission-not-ready']} />
            </MainCard>
        </Page>
    )
}

Permissions.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Permissions
