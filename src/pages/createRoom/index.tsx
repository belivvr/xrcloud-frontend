/* eslint-disable @next/next/no-img-element */
import { ReactElement, useState } from 'react'
import Layout from 'layout'
import Page from 'components/ui-component/Page'
import MainCard from 'ui-component/cards/MainCard'
import { Button, Table, TableBody } from '@mui/material'
import { BasicTableInput } from 'components/custom/common/BasicTableInput'
import { mockSceneList } from 'config'
import BasicTableCheckbox from 'components/custom/common/BasicTableCheckbox'
import { SceneSelect } from 'components/custom/room'
import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'

const CreateRoom = () => {
    const [sceneId, setSceneId] = useState('')
    const [roomName, setRoomName] = useState('')
    const [customData, setCustomData] = useState('')
    const [roomSize, setRoomSize] = useState('')
    const [isAutoScale, setIsAutoScale] = useState(false)

    const { locale } = useConfig()
    const localization = useLocalization(locale)

    return (
        <Page title="Create Room">
            <MainCard sx={{ overflow: 'scroll' }} title="Create Room">
                <Table>
                    <TableBody>
                        <SceneSelect sceneId={sceneId} sceneList={mockSceneList} onChange={(e) => setSceneId(e.target.value)} />
                        <BasicTableInput
                            type="text"
                            title={localization['room-name']}
                            value={roomName}
                            placeholder={localization['write-room-name']}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                        <BasicTableInput
                            type="text"
                            title={localization['custom-data']}
                            value={customData}
                            placeholder={localization['write-custom-data']}
                            onChange={(e) => setCustomData(e.target.value)}
                        />
                        <BasicTableInput
                            type="number"
                            title={localization['room-size']}
                            value={roomSize}
                            placeholder={localization['enter-room-size']}
                            onChange={(e) => setRoomSize(e.target.value)}
                        />
                        <BasicTableCheckbox title={localization['auto-scale']} onChange={(_, checked) => setIsAutoScale(checked)} />
                    </TableBody>
                </Table>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ minWidth: '300px', height: '48px', marginTop: '24px' }} variant="contained">
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
