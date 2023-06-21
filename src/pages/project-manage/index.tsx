import { ReactElement, useEffect } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import ProjectManages from 'custom/manage'
import { useRequest } from 'hooks/useRequest'

const ProjectManage = () => {
    const { get } = useRequest()
    const accessToken = localStorage.getItem('accessToken')
    useEffect(() => {
        get('/api/test/test', {
            params: {
                accessToken,
                test: 'happpppy'
            }
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }, [])

    return (
        <Page title="Project Manage">
            <MainCard title="Project Manage">
                <ProjectManages />
            </MainCard>
        </Page>
    )
}

ProjectManage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default ProjectManage
