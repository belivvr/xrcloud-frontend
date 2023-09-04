/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { EnterServiceButton, StyledAddIcon } from 'components/custom/styles/styled'
import { Project, Scene as SceneType } from 'types/project'
import { GridWrapper } from '../common'
import router from 'next/router'
import Scene from './Scene'

interface Props {
    project: Project | undefined
    sceneList: SceneType[] | undefined
    isDeleteMode: boolean
    updateScene: (sceneId: string) => Promise<any>
}

const SceneList = ({ project, sceneList, isDeleteMode, updateScene }: Props) => {
    return (
        <GridWrapper>
            {sceneList?.map((scene: SceneType) => {
                return <Scene key={scene.id} scene={scene} isDeleteMode={isDeleteMode} />
            })}
            <EnterServiceButton
                onClick={async () => {
                    if (project) {
                        router.push(`${project.sceneCreationUrl}&callback=${window.location.host}${window.location.pathname}`)
                    }
                }}
            >
                <StyledAddIcon color="inherit" />
            </EnterServiceButton>
        </GridWrapper>
    )
}

export default SceneList
