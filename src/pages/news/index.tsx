import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router' // Router to get the locale from the URL

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

// Server-side props fetching / 서버사이드 props 가져오기
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
    const router = useRouter() // Get the router to access the URL and locale / URL과 로케일 접근을 위해 useRouter 사용
    const { locale: configLocale } = useConfig() // 기존의 설정된 로케일 유지 (useConfig로부터)
    const localization = useLocalization(configLocale) // 설정된 로케일을 기반으로 로컬라이제이션 처리
    const [posts, setPosts] = useState<MediumPost[]>([]) // 포스트 상태 관리
    const [loading, setLoading] = useState(true) // 로딩 상태 관리

    // URL의 로케일을 기반으로 API에서 포스트 데이터 가져오기
    useEffect(() => {
        // URL에서 로케일 가져오기 (router.locale), 만약 없으면 기존의 configLocale 사용
        const currentLocale = router.locale || configLocale

        // 로케일에 따른 API 호출
        const mediumFeedUrl = currentLocale === 'en' ? 'belivvr-en' : 'belivvr'

        axios
            .get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${mediumFeedUrl}`)
            .then((response) => {
                setPosts(response.data.items)
                setLoading(false) // 데이터 가져온 후 로딩 상태 해제
            })
            .catch((error) => {
                console.error('Error fetching posts:', error)
                setLoading(false) // 오류 발생 시에도 로딩 상태 해제
            })
    }, [router.locale, configLocale]) // router.locale과 configLocale이 변경될 때마다 호출

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

// 페이지 레이아웃 설정
News.getLayout = function getLayout(page: ReactElement) {
    return <Layout variant="landing">{page}</Layout>
}

export default News
