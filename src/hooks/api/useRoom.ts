import { useSnackbar } from 'notistack'
import { CreateRoom, Project, Room } from 'types/project'
import { createHeaders } from 'utils/createHeaders'
import useChoicedProject from '../useChoicedProject'
import useConfig from '../useConfig'
import { useLocalization } from '../useLocalization'
import { useRequest } from '../useRequest'

export function useRoom() {
    const { choicedProject, choicedScene, setChoicedScene } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { enqueueSnackbar } = useSnackbar()

    const { get, post, deleteRequest, patch } = useRequest()

    const validateProject = (): boolean => {
        const apiKey = localStorage.getItem('apiKey')

        if (!choicedProject) {
            enqueueSnackbar(localization['scene-select-no-project'], {
                variant: 'error'
            })
            return false
        }

        if (!apiKey) {
            enqueueSnackbar(localization['scene-select-alert-no-key'], {
                variant: 'error'
            })
            setChoicedScene(undefined)

            return false
        }

        return true
    }

    const createRoom = async (sceneId: string, name: string, size: number, returnUrl: string) => {
        if (!validateProject()) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        if (size > 10) {
            enqueueSnackbar(localization['room-user-limit'], {
                variant: 'error'
            })
            return Promise.reject(new Error(localization['room-user-limit']))
        }

        if (!returnUrl) {
            enqueueSnackbar(localization['room-return-url-empty'], {
                variant: 'error'
            })
            return Promise.reject(new Error(localization['room-return-url-empty']))
        }

        try {
            const data = await post<CreateRoom>(
                '/api/admins/createRoom',
                {
                    sceneId,
                    name,
                    size: Math.min(10, Math.max(1, size)),
                    returnUrl
                },
                {
                    headers: createHeaders(choicedProject as Project)
                }
            )
            return data
        } catch (err: any) {
            console.log(err)
            if (err.response.status === 403) {
                enqueueSnackbar(localization['total-room-count-exceed'], {
                    variant: 'error'
                })
                throw err
            }

            if (err.response.status === 400) {
                enqueueSnackbar(err.response.data[0], {
                    variant: 'error'
                })
                throw err
            }
        }
    }

    const getRooms = (): Promise<{ items: Room[] }> => {
        if (!validateProject()) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        return get<{ items: Room[] }>('/api/rooms/findAll', {
            headers: createHeaders(choicedProject as Project),
            params: {
                sceneId: choicedScene
            }
        })
    }

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

    const deleteRoom = async (roomId: string) => {
        if (!validateProject()) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        return deleteRequest('/api/rooms/delete', {
            headers: createHeaders(choicedProject as Project),
            params: {
                roomId
            }
        })
    }

    const updateRoom = async ({
        roomId,
        roomName,
        returnUrl,
        roomSize
    }: {
        roomId: string
        roomName: string
        roomSize: number
        returnUrl: string
    }) => {
        if (!validateProject()) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        return patch<Room>(
            '/api/rooms/update',
            {
                roomId,
                roomSize,
                roomName,
                returnUrl
            },
            {
                headers: createHeaders(choicedProject as Project)
            }
        )
    }

    return { getRooms, getRoom, createRoom, deleteRoom, updateRoom }
}
