import { Scene } from 'types/project'
import useChoicedProject from './useChoicedProject'
import useConfig from './useConfig'
import { useLocalization } from './useLocalization'
import { useRequest } from './useRequest'

export function useScenes() {
    const { choicedProject } = useChoicedProject()
    const { locale } = useConfig()
    const localization = useLocalization(locale)
    const { get } = useRequest()

    const getScenes = (): Promise<{ items: Scene[] }> => {
        if (!choicedProject) {
            return Promise.reject(new Error(localization['scene-select-no-project']))
        }

        if (!choicedProject.projectKey) {
            return Promise.reject(new Error(localization['scene-select-alert-no-key']))
        }

        return get<{ items: Scene[] }>('/api/scenes/findAll', {
            headers: {
                'X-XRCLOUD-PROJECT-ID': choicedProject.id,
                Authorization: `bearer ${choicedProject.projectKey}`
            }
        })
    }

    return { getScenes }
}
