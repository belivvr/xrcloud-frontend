## useRoom.ts

이 파일은 React 훅을 통해 3D 공간의 Scene에 종속된 Room을 관리하는 기능을 제공합니다. 구체적으로는 "useRoom"라는 훅을 정의하고 있고, 이 훅은 Room의 조회, 생성, 삭제 등의 기능을 담당합니다. 각 함수는 특정 프로젝트와 연결되어 작동하며, 프로젝트는 고유한 ID와 키를 가집니다.

```typescript
/**
 * @remarks
 * 선택된 프로젝트가 유효한지 검증하는 함수입니다.
 * 프로젝트가 없거나, 프로젝트 키가 없을 경우에는 오류 메시지를 표시하고, 유효하지 않음을 반환합니다.
 *
 * @returns boolean - 유효한 프로젝트인지 여부
 *
 */

const validateProject = (): boolean => {
    if (!choicedProject) {
        enqueueSnackbar(localization['scene-select-no-project'], {
            variant: 'error'
        })
        return false
    }

    if (!choicedProject.projectKey) {
        console.log(123)
        enqueueSnackbar(localization['scene-select-alert-no-key'], {
            variant: 'error'
        })
        setChoicedScene(undefined)

        return false
    }

    return true
}
```

```typescript
/**
 * @remarks
 * 새로운 Room을 만드는 함수입니다.
 * 이 함수는 API 요청을 통해 새로운 Room을 생성하며, 성공적으로 생성되면 해당 Room을 반환합니다.
 *
 * @params sceneId - 새로운 Room을 생성할 Scene의 ID
 * @params name - 새로운 Room의 이름
 * @params size - 새로운 Room의 크기
 *
 * @returns new room (Room)
 *
 */

const createRoom = async (sceneId: string, name: string, size: number) => {
    if (!validateProject()) {
        return Promise.reject(new Error(localization['scene-select-no-project']))
    }

    return post<CreateRoom>(
        'api/admins/createRoom',
        {
            sceneId,
            name,
            size
        },
        {
            headers: createHeaders()
        }
    )
}
```

```typescript
/**
 * @remarks
 * 모든 Room을 조회하는 함수입니다.
 * 이 함수는 API 요청을 통해 Room의 목록을 가져오며, 성공적으로 조회되면 해당 Room의 목록을 반환합니다.
 *
 * @returns new roomlist (Room[])
 *
 */

const getRooms = (): Promise<{ items: Room[] }> => {
    if (!validateProject()) {
        return Promise.reject(new Error(localization['scene-select-no-project']))
    }

    return get<{ items: Room[] }>('/api/rooms/findAll', {
        headers: createHeaders(),
        params: {
            sceneId: choicedScene
        }
    })
}
```

```typescript
/**
 * @remarks
 * 특정 Room을 ID를 통해 찾아서 반환합니다.
 * 이 함수는 API 요청을 통해 Room을 가져오며, 성공적으로 조회되면 해당 Room을 반환합니다.
 *
 * @params roomId - 찾고자 하는 Room의 ID
 *
 * @returns room (Room)
 *
 */

const getRoom = async (roomId: string): Promise<Room> => {
    if (!validateProject()) {
        return Promise.reject(new Error(localization['scene-select-no-project']))
    }

    return get<Room>('/api/rooms/findById', {
        headers: createHeaders(),
        params: {
            roomId
        }
    })
}
```

```typescript
/**
 * @remarks
 * 특정 Room을 ID를 통해 삭제합니다.
 * 이 함수는 API 요청을 통해 Room을 삭제합니다.
 *
 * @params roomId - 삭제하고자 하는 Room의 ID
 *
 * @returns - 없음
 *
 */

const deleteRoom = async (roomId: string) => {
    if (!validateProject()) {
        return Promise.reject(new Error(localization['scene-select-no-project']))
    }

    return deleteRequest('/api/rooms/delete', {
        headers: createHeaders(),
        params: {
            roomId
        }
    })
}
```
