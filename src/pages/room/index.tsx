import { ReactElement, useEffect, useState } from 'react'

// material-ui

// project imports
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { mockRoom, mockSceneList, roomFields } from 'config'
import { Room as RoomType, Scene } from 'types/project'
import { SelectChangeEvent } from '@mui/material'
import Contents from 'components/custom/room/Contents'
import Buttons from 'components/custom/room/Buttons'
import Loading from 'components/custom/common/Loading'

const Room = () => {
    const [room, setRoom] = useState<RoomType | null>()
    const [sceneList, setSceneList] = useState<Scene[]>([])
    const [scene, setScene] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setScene(event.target.value as string)
    }

    const handleRoomEnter = () => {}

    const handleRoomUpdate = () => {}

    const handleRoomDelete = () => {}

    useEffect(() => {
        setRoom(mockRoom)
        setSceneList(mockSceneList)
        setScene(mockRoom.sceneId)
    }, [])

    if (!room) {
        return <Loading title="Room" />
    }

    return (
        <Page title="Room">
            <MainCard sx={{ overflow: 'scroll' }} title="Room">
                <Contents room={room} fields={roomFields} sceneList={sceneList} handleChange={handleChange} />
                <Buttons handleRoomEnter={handleRoomEnter} handleRoomUpdate={handleRoomUpdate} handleRoomDelete={handleRoomDelete} />
            </MainCard>
        </Page>
    )
}

Room.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Room
