import { ReactElement } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import PermissionList from 'components/custom/permissions/permissionList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'

const Permissions = () => {
    const { projectList } = useProjects()

    return (
        <Page title="Permissions">
            <MainCard
                title="Permissions"
                secondary={
                    <div style={{ width: '300px' }}>
                        <FormControlSelect currencies={projectList} captionLabel="ProjectId선택" />
                    </div>
                }
            >
                <PermissionList />
            </MainCard>
        </Page>
    )
}

Permissions.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Permissions
