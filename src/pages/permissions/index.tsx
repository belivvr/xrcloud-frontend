import { ReactElement } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import PermissionList from 'components/custom/permissions/permissionList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'
import useChoicedProject from 'hooks/useChoicedProject'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

const Permissions = () => {
    const { projectList } = useProjects()
    const { choicedProject } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    return (
        <Page title="Permissions">
            <MainCard
                title="Permissions"
                secondary={
                    <div style={{ width: '300px' }}>
                        {projectList && (
                            <FormControlSelect
                                selected={choicedProject?.id}
                                currencies={projectList}
                                captionLabel={localization['select-project-id']}
                            />
                        )}
                    </div>
                }
            >
                {choicedProject ? (
                    <PermissionList />
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 'calc(100vh - 268px)',
                            fontSize: '60px',
                            fontWeight: '700',
                            lineHeight: 1.5,
                            textAlign: 'center'
                        }}
                    >
                        {localization['click-project']}
                    </div>
                )}
            </MainCard>
        </Page>
    )
}

Permissions.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Permissions
