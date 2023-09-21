/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from 'react'
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { Button, Table, TableBody } from '@mui/material'
import { BasicTableInput } from 'components/custom/common/BasicTableInput'
import { SceneSelect } from 'components/custom/room'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import { useRouter } from 'next/router'
import { useScenes } from 'hooks/api/useScenes'
import useChoicedProject from 'hooks/useChoicedProject'
import { useProject } from 'hooks/api/useProject'
import { Scene } from 'types/project'
import { useRoom } from 'hooks/api/useRoom'

const CreateRoom = () => {
    const router = useRouter()

    const [sceneList, setSceneList] = useState<Scene[]>([])
    const [sceneId, setSceneId] = useState(router.query.sceneId as string)
    const [roomName, setRoomName] = useState('')
    const [roomReturnUrl, setRoomReturnUrl] = useState('')

    const [roomSize, setRoomSize] = useState('')
    const [query] = useState(router.query)

    const { choicedProject, setChoicedProject } = useChoicedProject()
    const { findById } = useProject()
    const { createRoom } = useRoom()
    const { getScenes } = useScenes()

    const { locale } = useConfig()
    const localization = useLocalization(locale)

    const handleCreateRoom = () => {
        createRoom(sceneId, roomName, Number(roomSize), roomReturnUrl)
            .then((res) => {
                router.push('/rooms')
            })
            .catch((err) => {})
    }

    useEffect(() => {
        if (query.projectId === undefined) return
        if (typeof query.projectId !== 'string') return

        findById(query.projectId).then((res) => {
            setChoicedProject(res)
        })
    }, [query])

    useEffect(() => {
        if (!choicedProject) return
        getScenes()
            .then((res) => setSceneList(res.items))
            .catch((err) => console.log(err))
    }, [choicedProject])

    return (
        <Page title="Create Room">
            <MainCard sx={{ overflow: 'scroll' }} title="Create Room">
                <Table>
                    <TableBody>
                        <SceneSelect sceneId={sceneId} sceneList={sceneList} onChange={(e) => setSceneId(e.target.value)} />
                        <BasicTableInput
                            type="text"
                            title={localization['room-name']}
                            value={roomName}
                            placeholder={localization['write-room-name']}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                        <BasicTableInput
                            type="number"
                            title={localization['room-size']}
                            value={roomSize}
                            placeholder={localization['enter-room-size']}
                            onChange={(e) => setRoomSize(e.target.value)}
                        />
                        <BasicTableInput
                            type="text"
                            title={localization['room-return-url']}
                            value={roomReturnUrl}
                            placeholder={localization['room-return-url-placeholder']}
                            onChange={(e) => setRoomReturnUrl(e.target.value)}
                        />
                    </TableBody>
                </Table>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleCreateRoom} style={{ minWidth: '300px', height: '48px', marginTop: '24px' }} variant="contained">
                        {localization.create}
                    </Button>
                </div>
            </MainCard>
        </Page>
    )
}

CreateRoom.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default CreateRoom
