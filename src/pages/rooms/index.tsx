import React, { ReactElement } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import RoomList from 'components/custom/rooms/roomList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'
import useChoicedProject from 'hooks/useChoicedProject'
import { NeedChoiceProject } from 'components/custom/common/NeedChoiceProject'

const Rooms = () => {
    const { projectList } = useProjects()
    const { choicedProject } = useChoicedProject()

    return (
        <Page title="Rooms">
            <MainCard
                title="Rooms"
                secondary={
                    <div style={{ width: '300px' }}>
                        {projectList && (
                            <FormControlSelect selected={choicedProject?.id} currencies={projectList} captionLabel="ProjectId선택" />
                        )}
                    </div>
                }
            >
                {choicedProject ? <RoomList /> : <NeedChoiceProject />}
            </MainCard>
        </Page>
    )
}

Rooms.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Rooms
