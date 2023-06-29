import { ReactElement, useState, useEffect } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import PermissionContents from 'components/custom/permission/Contents'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { Permission as PermissionType } from 'types/project'
import { mockPermission, permissionFields, permissionCheckFields } from 'config'
import { useProjects } from 'hooks/useProjects'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

const Permission = () => {
    const [permission, setPermission] = useState<PermissionType | undefined>()
    const { projectList } = useProjects()
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    useEffect(() => {
        setPermission(mockPermission)
    }, [])
    return (
        <Page title="Permission">
            <MainCard
                title="Permission"
                secondary={
                    <div style={{ width: '300px' }}>
                        <FormControlSelect currencies={projectList} captionLabel={localization['select-project-id']} />
                    </div>
                }
            >
                <PermissionContents fields={permissionFields} checkfields={permissionCheckFields} />
            </MainCard>
        </Page>
    )
}

Permission.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Permission
