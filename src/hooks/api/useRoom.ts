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

    const { get, post, deleteRequest } = useRequest()

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
                headers: createHeaders(choicedProject as Project)
            }
        )
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

    return { getRooms, getRoom, createRoom, deleteRoom }
}
