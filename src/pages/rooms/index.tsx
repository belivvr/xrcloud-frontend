import React, { HtmlHTMLAttributes, ReactElement, useState } from 'react'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import RoomList from 'custom/rooms/roomList'
import FormControlSelect from 'ui-component/extended/Form/FormControlSelect'

const currencies = [
    { value: '', label: 'None' },
    { value: '1', label: '프로젝트1' }
]

const Rooms = () => {
    const [choiceProject, setChoiceProject] = useState(false)

    return (
        <Page title="Rooms">
            <MainCard
                title="Rooms"
                secondary={
                    <div style={{ width: '300px' }}>
                        <FormControlSelect currencies={currencies} captionLabel="ProjectId선택" />
                    </div>
                }
            >
                {/* {choiceProject ? <RoomList /> : null} */}
                <RoomList />
            </MainCard>
        </Page>
    )
}

Rooms.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Rooms
