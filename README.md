# Readme

20230809
서버 API를 사용할 때, 프로젝트 ID를 header로 담아서 보내고 있는데, api가 변경되면서 query로 싣게됐음.
추후에 웹 서버로 보내는 api도 query로 보낼 수 있게 수정해야함.

example)

```typescript
    const getRoom = async (roomId: string): Promise<Room> => {
        if (!validateProject()) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        return get<Room>('/api/rooms/findById', {
            headers: createHeaders(choicedProject as Project),
            params: {
                roomId
            }
        })
    }

    ------------------------------------------------------------->

    const getRoom = async (roomId: string): Promise<Room> => {
        if (!validateProject()) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        return get<Room>('/api/rooms/findById?projectId=[...]', {
            headers: {
                Authorization: `bearer ${accessToken}`
            },
            params: {
                roomId
            }
        })
    }
```
