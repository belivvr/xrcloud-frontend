import { ReactElement } from 'react'

// material-ui
import { Typography } from '@mui/material'

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import RoomList from 'custom/rooms/roomList'

const Rooms = () => (
    <Page title="Rooms">
        <MainCard title="Rooms">
            <RoomList />
        </MainCard>
    </Page>
)

Rooms.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Rooms
