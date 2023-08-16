import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import MainCard from 'ui-component/cards/MainCard'
import axios from 'axios'
import { Locale, MediumPost, StaticProps } from 'types/config'
import { NewsCards } from 'components/custom/news'
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

const News = ({ locale }: Props) => {
    const { locale: configLocale } = useConfig()
    const localization = useLocalization(configLocale)
    const [posts, setPosts] = useState<MediumPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${configLocale === 'en' ? 'belivvr-en' : 'belivvr'}`)
            .then((response) => {
                setPosts(response.data.items)
            })
    }, [configLocale])

    useEffect(() => {
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <Page position={'relative'} title={localization.news}>
                <Metatag locale={locale} />
            </Page>
        )
    }

    return (
        <Page position={'relative'} title={localization.news}>
            <MainCard title={localization.news}>
                <NewsCards posts={posts} />
            </MainCard>
        </Page>
    )
}

News.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default News
