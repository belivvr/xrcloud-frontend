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
import { Loading } from 'components/custom/common'

const RoomUpdate = () => {
    const [room, setRoom] = useState<RoomType | null>()
    const [sceneList, setSceneList] = useState<Scene[]>([])
    const [scene, setScene] = useState('')

    const selectChange = (event: SelectChangeEvent) => {
        setScene(event.target.value as string)
    }

    const roomEnter = () => {}

    const roomUpdate = () => {}

    const roomDelete = () => {}

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
                <Contents room={room} fields={roomFields} sceneList={sceneList} selectChange={selectChange} />
                <Buttons roomEnter={roomEnter} roomUpdate={roomUpdate} roomDelete={roomDelete} />
            </MainCard>
        </Page>
    )
}

RoomUpdate.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default RoomUpdate
