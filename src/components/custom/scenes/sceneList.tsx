/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { Scene } from 'types/project'
import styled from '@emotion/styled'
import { BasicContentsButton } from '../common'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
`

interface Props {
    sceneList: Scene[] | undefined
    createScene: () => Promise<any>
    updateScene: (sceneId: string) => Promise<any>
}

const SceneList = ({ sceneList, createScene, updateScene }: Props) => {
    return (
        <Wrapper>
            {sceneList?.map((scene: Scene) => {
                return (
                    <BasicContentsButton key={scene.id}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '300px', objectFit: 'cover' }}>
                            <img style={{ flex: 4 }} src={scene.thumbnailUrl} alt={scene.thumbnailUrl} />
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
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
            <EnterServiceButton>
                <StyledAddIcon color="inherit" />
            </EnterServiceButton>
        </Wrapper>
    )
}

export default SceneList
