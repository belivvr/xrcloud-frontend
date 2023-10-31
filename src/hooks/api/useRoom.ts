import { useSnackbar } from 'notistack'
import { CreateRoom, Project, Room } from 'types/project'
import { createHeaders } from 'utils/createHeaders'
import useChoicedProject from '../useChoicedProject'
import useConfig from '../useConfig'
import { useLocalization } from '../useLocalization'
import { useRequest } from '../useRequest'

export function useRoom() {
    const { choicedProject, choicedScene } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { enqueueSnackbar } = useSnackbar()

    const { get, post, deleteRequest, patch } = useRequest()

    const validateProject = (): boolean => {
        if (!choicedProject) {
            enqueueSnackbar(localization['scene-select-no-project'], {
                variant: 'error'
            })
            return false
        }

        return true
    }

    const createRoom = async (sceneId: string, name: string, size: number, returnUrl: string) => {
        if (!validateProject()) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        if (!name) {
            enqueueSnackbar(localization['error-create-room2'], {
                variant: 'error'
            })
            return Promise.reject(new Error(localization['error-create-room2']))
        }

        if (!size) {
            enqueueSnackbar(localization['error-create-room3'], {
                variant: 'error'
            })
            return Promise.reject(new Error(localization['error-create-room3']))
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
                    size,
                    returnUrl
                },
                {
                    headers: createHeaders(choicedProject as Project)
                }
            )
            return data
        } catch (err: any) {
            if (err.response.status === 400) {
                if (Array.isArray(err.response.data)) {
                    enqueueSnackbar(localization['error-create-room1'], {
                        variant: 'error'
                    })
                }

                if (err.response.data === 'Room size cannot exceed 10 for this tier.') {
                    enqueueSnackbar(localization['error-create-room4'], {
                        variant: 'error'
                    })
                }

                if (err.response.data === 'Cannot create more than 1 rooms for this tier.') {
                    enqueueSnackbar(localization['error-create-room5'], {
                        variant: 'error'
                    })
                }

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
