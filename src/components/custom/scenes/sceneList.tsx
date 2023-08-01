/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { Scene } from 'types/project'
import { BasicContentsButton, GridWrapper } from '../common'
import router from 'next/router'

interface Props {
    sceneList: Scene[] | undefined
    createScene: () => Promise<any>
    updateScene: (sceneId: string) => Promise<any>
}

const SceneList = ({ sceneList, createScene, updateScene }: Props) => {
    return (
        <GridWrapper>
            {sceneList?.map((scene: Scene) => {
                return (
                    <div key={scene.id} style={{ display: 'flex', flexDirection: 'column' }}>
                        <BasicContentsButton
                            style={{
                                position: 'relative',
                                height: '100%',
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px'
                            }}
                            onClick={async () => {
                                const { modifySceneUrl } = await updateScene(scene.id)
                                router.push(`${modifySceneUrl}&callback=${window.location.host}${window.location.pathname}`)
                            }}
                        >
                            <img
                                style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                                src={scene.thumbnailUrl}
                                alt={scene.name}
                            />
                        </BasicContentsButton>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'start',
                                padding: '14px 14px',
                                color: '#333',
                                border: '1px solid #eee',
                                borderTop: '0px',
                                borderBottomLeftRadius: '4px',
                                borderBottomRightRadius: '4px'
                            }}
                        >
                            <div style={{ marginBottom: '5px' }}>
                                <span>ID ) </span>
                                <span style={{ fontWeight: 700 }}>{scene.id}</span>
                            </div>
                            <div style={{ marginBottom: '5px' }}>
                                <span>Name ) </span>
                                <span style={{ fontWeight: 700 }}>{scene.name}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
            <EnterServiceButton
                onClick={async () => {
                    const { newSceneUrl } = await createScene()
                    router.push(`${newSceneUrl}&callback=${window.location.host}${window.location.pathname}`)
                }}
            >
                <StyledAddIcon color="inherit" />
            </EnterServiceButton>
        </GridWrapper>
    )
}

export default SceneList
