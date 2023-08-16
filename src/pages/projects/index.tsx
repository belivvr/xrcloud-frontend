import { ReactElement, useEffect, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import ProjectList from 'components/custom/projectList'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { MainCardCustom } from 'components/custom/common/MainCardCustom'
import { useProject } from 'hooks/api/useProject'
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

const Projects = ({ locale }: Props) => {
    const { projectList } = useProject()
    const { locale: configLocale, onChangePresetColor } = useConfig()
    const localization = useLocalization(configLocale)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onChangePresetColor('theme6')
        setLoading(false)
    }, [])

    if (loading) {
        return (
            <Page title={localization['project-manage']}>
                <Metatag locale={locale} />
            </Page>
        )
    }

    return (
        <Page title={localization['project-manage']}>
            <MainCardCustom title={localization['project-manage']}>
                <ProjectList projectList={projectList} />
            </MainCardCustom>
        </Page>
    )
}

Projects.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Projects
