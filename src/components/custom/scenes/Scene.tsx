/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { BasicContentsButton } from '../common'
import { Scene as SceneType } from 'types/project'
import router from 'next/router'
import { cacheRemove } from 'utils/cacheRemove'
import ListDeleteIcon from '../common/ListDeleteIcon'

interface Props {
    scene: SceneType
    isDeleteMode: boolean
    handleOpen: () => void
    setSelectedSceneId: React.Dispatch<React.SetStateAction<string>>
}

export default function Scene({ scene, isDeleteMode, handleOpen, setSelectedSceneId }: Props) {
    return (
        <div key={scene.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {isDeleteMode && (
                <ListDeleteIcon
                    onClick={() => {
                        setSelectedSceneId(scene.id)
                        handleOpen()
                    }}
                />
            )}
            <BasicContentsButton
                style={{
                    position: 'relative',
                    height: '100%',
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                    overflow: 'hidden'
                }}
                onClick={async () => {
                    window.open(`${scene.sceneModificationUrl}&callback=${window.location.host}${window.location.pathname}`)
                }}
            >
                <img
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    src={cacheRemove(scene.thumbnailUrl)}
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
                    <span>Name ) </span>
                    <span style={{ fontWeight: 700 }}>{scene.name}</span>
                </div>
                <div style={{ marginBottom: '5px' }}>
                    <span>ID ) </span>
                    <span style={{ fontWeight: 700 }}>{scene.id}</span>
                </div>
            </div>
        </div>
    )
}
