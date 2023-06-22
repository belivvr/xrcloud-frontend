import { ReactElement } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import PermissionList from 'custom/permissions/permissionList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
const currencies = [
    { value: '', label: 'None' },
    { value: '1', label: '프로젝트1' }
]

const Permissions = () => {
    return (
        <Page title="Permissions">
            <MainCard
                title="Permissions"
                secondary={
                    <div style={{ width: '300px' }}>
                        <FormControlSelect currencies={currencies} captionLabel="ProjectId선택" />
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
