import { ReactElement, useEffect } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import ProjectList from 'components/custom/projectList'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { MainCardCustom } from 'components/custom/common/MainCardCustom'
import { Footer } from 'components/custom/common/Footer'
import { useProject } from 'hooks/api/useProject'

const Projects = () => {
    const { projectList } = useProject()
    const { locale, onChangePresetColor } = useConfig()
    const localization = useLocalization(locale)

    useEffect(() => {
        onChangePresetColor('theme6')
    }, [])
    return (
        <Page title={localization['project-manage']}>
            <MainCardCustom title={localization['project-manage']}>
                <ProjectList projectList={projectList} />
            </MainCardCustom>
            <Footer />
        </Page>
    )
}

Projects.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Projects
