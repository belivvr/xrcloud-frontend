import { ReactElement } from 'react'

// material-ui
import { Typography } from '@mui/material'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectManages from 'custom/manage'

// ==============================|| SAMPLE PAGE ||============================== //

const ProjectManage = () => (
    <Page title="Project-Manage">
        <MainCard title="Project-Manage">
            <ProjectManages />
        </MainCard>
    </Page>
)

ProjectManage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ProjectManage
