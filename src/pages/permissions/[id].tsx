import { ReactElement } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import PermissionContents from 'components/custom/permission/Contents'
import { permissionFields, permissionCheckFields } from 'config'

const Permission = () => {
    return (
        <Page title="Permission">
            <MainCard title="Permission">
                <PermissionContents fields={permissionFields} checkfields={permissionCheckFields} />
            </MainCard>
        </Page>
    )
}

Permission.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Permission
