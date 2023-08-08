import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import MainCard from 'ui-component/cards/MainCard'
import fs from 'fs'
import { MarkdownView } from 'components/custom/common/MarkdownView'

type Locale = 'en' | 'ko'

interface StaticProps {
    locales: Locale[]
    locale: Locale
    defaultLocale: Locale
}

export async function getStaticProps(data: StaticProps) {
    try {
        console.log(`public/landing-${data.locale}.md`)
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

const Landing = ({ post, locale }: { post: string; locale: Locale }) => {
    const [markdown, setMarkdown] = useState<string>(post)
    const { onChangePresetColor } = useConfig()
    const localization = useLocalization(locale)

    useEffect(() => {
        onChangePresetColor('theme6')
    }, [])

    useEffect(() => {
        fetch(`landing-${locale}.md`)
            .then((response) => response.blob())
            .then((blob) => blob.text())
            .then((data) => {
                setMarkdown(data)
            })
    }, [locale])

    return (
        <Page position={'relative'} title={localization.landing}>
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
