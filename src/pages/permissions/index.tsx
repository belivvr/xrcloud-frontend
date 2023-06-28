import { ReactElement } from 'react'
// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import PermissionList from 'components/custom/permissions/permissionList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'
import useChoicedProject from 'hooks/useChoicedProject'

const Permissions = () => {
    const { projectList } = useProjects()
    const { choicedProject } = useChoicedProject()

    return (
        <Page title="Permissions">
            <MainCard
                title="Permissions"
                secondary={
                    <div style={{ width: '300px' }}>
                        {projectList && (
                            <FormControlSelect selected={choicedProject?.id} currencies={projectList} captionLabel="ProjectId선택" />
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
                        우측 상단에서 <br /> 프로젝트를 선택해주세요.
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
