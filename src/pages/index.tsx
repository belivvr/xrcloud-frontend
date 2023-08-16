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
import Metatag from 'components/custom/common/Metatag'

type Locale = 'en' | 'ko'

interface StaticProps {
    locales: Locale[]
    locale: Locale
    defaultLocale: Locale
}

interface Props {
    post: string
    locale: Locale
}

export const getServerSideProps = async (data: StaticProps) => {
    try {
        const post = fs.readFileSync(`public/landing-${data.locale}.md`).toString()
        return {
            props: { post, locale: data.locale }
        }
    } catch (err) {
        console.error(err)
        return {
            props: {},
            notFound: true
        }
    }
}

const Landing = ({ post, locale }: Props) => {
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
            <Metatag locale={locale} />
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
