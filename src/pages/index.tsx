import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import MainCard from 'ui-component/cards/MainCard'
import fs from 'fs'
import { MarkdownView } from 'components/custom/common/MarkdownView'
import Head from 'next/head'

type Locale = 'en' | 'ko'

interface StaticProps {
    locales: Locale[]
    locale: Locale
    defaultLocale: Locale
}

interface Metatag {
    title: string
    description: string
    keywords: string
    locale: string
}

interface Props {
    post: string
    locale: Locale
    meta: Metatag
}

export const getServerSideProps = async (data: StaticProps) => {
    try {
        const post = fs.readFileSync(`public/landing-${data.locale}.md`).toString()
        if (data.locale === 'ko') {
            const meta: Metatag = {
                title: 'XRCLOUD:웹 메타버스 서비스 개발을 위한 클라우드 SaaS',
                description: `저렴한 비용, 빠른 접근, 강력한 기능의 3D공간 웹 메타버스를 만들 때는 XRCLOUD를 이용하세요.
                홈페이지를 만드는 것 처럼 쉽고 빠르게 적은 비용으로도 웹 메타버스를 만들 수 있습니다.
                글로벌 메타버스 오픈소스 모질라허브에 개발,운영에 필요한 추가 기능을 더하고
                공공기관을 위해  안전한 G클라우드 까지 제공합니다. XRCLOUD로 XR공간 컴퓨팅 시대의 웹 서비스를 준비하세요.`,
                keywords: '메타버스, 웹메타버스, 모질라허브, XRCLOUD, G클라우드, WebXR, 공간웹',
                locale: 'ko-KR'
            }
            return {
                props: {
                    post,
                    locale: data.locale,
                    meta
                }
            }
        }
        const meta: Metatag = {
            title: 'XRCLOUD:SaaS for Web Metaverse Service Develop',
            description: `Use XRCLOUD to create a low-cost, easy-to-access, powerful features 3D space web metaverse.
            You can create a website bus faster and cheaper like making a homepage.
            It provides all the features of the proven Mozilla Hub opensource, and provides additional features necessary for site operation and development.
            Prepare your web services for the XR Spatial Computing era with XRCLOUD.`,
            keywords: 'Metaverse, Web Metaverse, XRCLOUD, Metaverse Saas, WebXR, Spatial Web',
            locale: 'en-US'
        }
        return {
            props: { post, locale: data.locale, meta }
        }
    } catch (err) {
        console.error(err)
        return {
            props: {},
            notFound: true
        }
    }
}

const Landing = ({ post, locale, meta }: Props) => {
    const [markdown, setMarkdown] = useState<string>(post)
    const { onChangePresetColor, locale: configLocale, onChangeLocale } = useConfig()
    const localization = useLocalization(locale)

    useEffect(() => {
        onChangePresetColor('theme6')
        onChangeLocale(locale)
    }, [])

    useEffect(() => {
        fetch(`landing-${locale}.md`)
            .then((response) => response.blob())
            .then((blob) => blob.text())
            .then((data) => {
                setMarkdown(data)
            })
    }, [])

    return (
        <Page position={'relative'} title={localization.landing}>
            <Head>
                <title>{meta.title}</title>
                <meta name="title" content={meta.title} />
                <meta name="description" content={meta.description} />
                <meta name="keywords" content={meta.keywords} />
                <meta property="og:locale" content={meta.locale} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
                <meta property="twitter:title" content={meta.title} />
                <meta property="twitter:description" content={meta.description} />
            </Head>
            <MainCard title={localization.landing}>
                <MarkdownView post={markdown} />
            </MainCard>
        </Page>
    )
}

Landing.getLayout = function getLayout(page: ReactElement) {
    return <Layout variant="landing">{page}</Layout>
}

export default Landing
