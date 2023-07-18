## useScenes.ts

이 파일은 React 훅을 통해 3D 공간의 Scene을 관리하는 기능을 제공합니다. 구체적으로는 "useScenes"라는 훅을 정의하고 있고, 이 훅은 Scene의 조회, 생성, 업데이트 등의 기능을 담당합니다. 각 함수는 특정 프로젝트와 연결되어 작동하며, 프로젝트는 고유한 ID와 키를 가집니다.

```typescript
/**
 * @remarks
 * 선택된 프로젝트가 유효한지 검증하는 함수입니다.
 * 프로젝트가 없거나, 프로젝트 키가 없을 경우에는 오류 메시지를 표시하고, 유효하지 않음을 반환합니다.
 *
 * @returns boolean - 유효한 프로젝트인지 여부
 */

const validateProject = (): boolean => {
    if (!choicedProject) {
        enqueueSnackbar(localization['scene-select-no-project'], {
            variant: 'error'
        })
        return false
    }

    if (!choicedProject.projectKey) {
        enqueueSnackbar(localization['scene-select-alert-no-key'], {
            variant: 'error'
        })
        return false
    }

    return true
}
```

```typescript
/**
 * @remarks
 * 모든 Scene을 조회하는 함수입니다.
 * 이 함수는 API 요청을 통해 Scene의 목록을 가져오며, 성공적으로 조회되면 해당 Scene의 목록을 반환합니다.
 *
 * @returns Scene list (Scene[])
 *
 */
const getScenes = (): Promise<{ items: Scene[] }> => {
    if (!validateProject() || !choicedProject) {
        return Promise.reject(new Error(localization['scene-select-no-project']))
    }
    return get<{ items: Scene[] }>('/api/scenes/findAll', {
        headers: createHeaders(choicedProject)
    })
}
```

```typescript
/**
 * @remarks
 * 새로운 Scene을 생성하는 함수입니다.
 * 이 함수는 API 요청을 통해 새로운 Scene의 Spoke URL을 반환합니다.
 *
 * @returns new scene URL (string)
 *
 */
const createScene = () => {
    if (!validateProject() || !choicedProject) {
        return Promise.reject(new Error(localization['scene-select-no-project']))
    }

    return get<any>('/api/admins/scenes', {
        headers: createHeaders(choicedProject)
    })
}
```

```typescript
/**
 * @remarks
 * 기존 Scene을 수정하는 함수입니다.
 * 이 함수는 API 요청을 통해 Scene의 Spoke URL을 반환합니다.
 *
 * @returns new modify scene URL (string)
 *
 */
const updateScene = (sceneId: string) => {
    if (!validateProject() || !choicedProject) {
        return Promise.reject(new Error(localization['scene-select-no-project']))
    }

    return get<{ modifySceneUrl: string }>('/api/admins/scene-update', {
        params: {
            sceneId
        },
        headers: createHeaders(choicedProject)
    })
}
```
