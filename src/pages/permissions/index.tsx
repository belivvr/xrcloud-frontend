import { ReactElement } from 'react'

// material-ui
import { Typography } from '@mui/material'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import PermissionList from 'custom/permissions/permissionList'

const Permissions = () => (
    <Page title="Permissions">
        <MainCard title="Permissions">
            <PermissionList />
        </MainCard>
    </Page>
)

Permissions.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Permissions
