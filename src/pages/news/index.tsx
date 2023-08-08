import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import MainCard from 'ui-component/cards/MainCard'
import axios from 'axios'
import { MediumPost } from 'types/config'
import { NewsCards } from 'components/custom/news'

const News = () => {
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const [posts, setPosts] = useState<MediumPost[]>([])

    useEffect(() => {
        axios
            .get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${locale === 'en' ? 'belivvr-en' : 'belivvr'}`)
            .then((response) => {
                setPosts(response.data.items)
            })
    }, [locale])

    return (
        <Page position={'relative'} title={localization.news}>
            <MainCard title={localization.news}>
                <NewsCards posts={posts} />
            </MainCard>
        </Page>
    )
}

News.getLayout = function getLayout(page: ReactElement) {
    return <Layout variant="landing">{page}</Layout>
}

export default News
