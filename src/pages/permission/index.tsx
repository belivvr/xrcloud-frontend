import { ReactElement, useState, useEffect } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import PermissionContents from 'custom/permission/Contents'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { Permission as PermissionType } from 'types/project'
import { mockPermission, permissionFields, permissionCheckFields } from 'config'

const currencies = [
    { value: '', label: 'None' },
    { value: '1', label: '프로젝트1' }
]

const Permission = () => {
    const [permission, setPermission] = useState<PermissionType | undefined>()

    useEffect(() => {
        setPermission(mockPermission)
    }, [])
    return (
        <Page title="Permission">
            <MainCard
                title="Permission"
                secondary={
                    <div style={{ width: '300px' }}>
                        <FormControlSelect currencies={currencies} captionLabel="ProjectId선택" />
                    </div>
                }
            >
                <PermissionContents permission={permission} fields={permissionFields} checkfields={permissionCheckFields} />
            </MainCard>
        </Page>
    )
}

Permission.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Permission
