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
                    <BasicContentsButton
                        onClick={async () => {
                            const response = await updateScene(scene.id)
                            console.log(response)
                        }}
                        key={scene.id}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', objectFit: 'cover' }}>
                            <img style={{ height: '250px', objectFit: 'cover' }} src={scene.thumbnailUrl} alt={scene.thumbnailUrl} />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '62px',
                                    color: '#333',
                                    borderTop: '1px solid #eee'
                                }}
                            >
                                {scene.thumbnailUrl}
                            </div>
                        </div>
                    </BasicContentsButton>
                )
            })}
            <EnterServiceButton
                onClick={async () => {
                    const { newSceneUrl } = await createScene()
                    router.push(newSceneUrl)
                }}
            >
                <StyledAddIcon color="inherit" />
            </EnterServiceButton>
        </GridWrapper>
    )
}

export default SceneList
