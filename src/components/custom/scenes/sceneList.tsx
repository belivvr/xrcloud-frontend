/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { Scene } from 'types/project'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import router from 'next/router'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
`

const SceneButton = styled(Button)`
    border: 1px solid #eee;
    padding: 0;
`

interface Props {
    sceneList: Scene[] | undefined
}

const SceneList = ({ sceneList }: Props) => {
    return (
        <Wrapper>
            {sceneList?.map((scene: Scene) => {
                return (
                    <SceneButton key={scene.id} onClick={() => router.push(scene.sceneUrl)}>
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
                    </SceneButton>
                )
            })}
            <EnterServiceButton>
                <StyledAddIcon color="inherit" />
            </EnterServiceButton>
        </Wrapper>
    )
}

export default SceneList
