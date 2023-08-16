import { ReactElement, useEffect, useState } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { NeedChoiceProject } from 'components/custom/common'
import { useLocalization } from 'hooks/useLocalization'
import useConfig from 'hooks/useConfig'
import { Locale, StaticProps } from 'types/config'
import Metatag from 'components/custom/common/Metatag'

export const getServerSideProps = async (data: StaticProps) => {
    try {
        return {
            props: { locale: data.locale }
        }
    } catch (err) {
        console.error(err)
        return {
            props: {},
            notFound: true
        }
    }
}

interface Props {
    locale: Locale
}

const Permissions = ({ locale }: Props) => {
    const [loading, setLoading] = useState(true)
    const { locale: configLocale } = useConfig()
    const localization = useLocalization(configLocale)

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <Page title="Permissions">
                <Metatag locale={locale} />
            </Page>
        )
    }

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
