/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from 'react'
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { Button, Table, TableBody } from '@mui/material'
import { BasicTableInput } from 'components/custom/common/BasicTableInput'
import { mockSceneList } from 'config'
import BasicTableCheckbox from 'components/custom/common/BasicTableCheckbox'
import { SceneSelect } from 'components/custom/room'

const CreateRoom = () => {
    const [sceneId, setSceneId] = useState('')
    const [roomName, setRoomName] = useState('')
    const [customData, setCustomData] = useState('')
    const [roomSize, setRoomSize] = useState('')
    const [isAutoScale, setIsAutoScale] = useState(false)

    return (
        <Page title="Create Room">
            <MainCard sx={{ overflow: 'scroll' }} title="Create Room">
                <Table>
                    <TableBody>
                        <SceneSelect sceneId={sceneId} sceneList={mockSceneList} onChange={(e) => setSceneId(e.target.value)} />
                        <BasicTableInput
                            type="text"
                            title={'방 이름'}
                            value={roomName}
                            placeholder={'방 이름을 작성하세요'}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                        <BasicTableInput
                            type="text"
                            title={'커스텀 데이터'}
                            value={customData}
                            placeholder={'커스텀 데이터를 작성하세요'}
                            onChange={(e) => setCustomData(e.target.value)}
                        />
                        <BasicTableInput
                            type="number"
                            title={'방 사이즈'}
                            value={roomSize}
                            placeholder={'방 사이즈를 입력하세요'}
                            onChange={(e) => setRoomSize(e.target.value)}
                        />
                        <BasicTableCheckbox title={'오토 스케일'} onChange={(_, checked) => setIsAutoScale(checked)} />
                    </TableBody>
                </Table>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ minWidth: '300px', height: '48px', marginTop: '24px' }} variant="contained">
                        생성하기
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
