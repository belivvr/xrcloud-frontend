import { useSnackbar } from 'notistack'
import { Room } from 'types/project'
import useChoicedProject from '../useChoicedProject'
import useConfig from '../useConfig'
import { useLocalization } from '../useLocalization'
import { useRequest } from '../useRequest'

export function useRoom() {
    const { choicedProject } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { enqueueSnackbar } = useSnackbar()

    const { get } = useRequest()

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

    const createHeaders = () => ({
        'X-XRCLOUD-PROJECT-ID': choicedProject?.id,
        Authorization: `bearer ${choicedProject?.projectKey}`
    })

    const getRooms = (): Promise<{ items: Room[] }> => {
        if (!validateProject()) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        return get<{ items: Room[] }>('/api/rooms/findAll', {
            headers: createHeaders()
        })
    }

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

    return { getRooms, getRoom }
}
