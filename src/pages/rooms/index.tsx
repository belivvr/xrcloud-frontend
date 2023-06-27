import React, { ReactElement } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import RoomList from 'components/custom/rooms/roomList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'
import { useProjects } from 'hooks/useProjects'

const Rooms = () => {
    const { projectList } = useProjects()

    return (
        <Page title="Rooms">
            <MainCard
                title="Rooms"
                secondary={
                    <div style={{ width: '300px' }}>
                        <FormControlSelect currencies={projectList} captionLabel="ProjectId선택" />
                    </div>
                }
            >
                <RoomList />
            </MainCard>
        </Page>
    )
}

Rooms.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Rooms
