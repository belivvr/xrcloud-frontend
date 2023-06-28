import { ReactElement } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectList from 'components/custom/projectList'
import { useProjects } from 'hooks/useProjects'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

const Projects = () => {
    const { projectList } = useProjects()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    return (
        <Page title={localization['project-manage']}>
            <MainCard title={localization['project-manage']}>
                <ProjectList projectList={projectList} />
            </MainCard>
        </Page>
    )
}

Projects.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Projects
