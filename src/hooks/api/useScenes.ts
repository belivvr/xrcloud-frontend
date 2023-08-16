import { useSnackbar } from 'notistack'
import { Scene } from 'types/project'
import { createHeaders } from 'utils/createHeaders'
import useChoicedProject from '../useChoicedProject'
import useConfig from '../useConfig'
import { useLocalization } from '../useLocalization'
import { useRequest } from '../useRequest'

export function useScenes() {
    const { choicedProject } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { enqueueSnackbar } = useSnackbar()

    const { get } = useRequest()

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
            return false
        }

        return true
    }

    const getScenes = (): Promise<{ items: Scene[] }> => {
        if (!validateProject() || !choicedProject) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }
        return get<{ items: Scene[] }>('/api/scenes/findAll', {
            headers: createHeaders(choicedProject)
        })
    }

    const createScene = () => {
        if (!validateProject() || !choicedProject) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        return get<any>('/api/admins/scenes', {
            headers: createHeaders(choicedProject)
        })
    }

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

    return { getScenes, createScene, updateScene }
}
