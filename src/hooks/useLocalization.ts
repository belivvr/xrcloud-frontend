import { useMemo } from 'react'
import { Localization } from 'utils/locales/type'

export function useLocalization(langs: 'ko' | 'en' = 'en'): Localization {
    const texts = useMemo(() => {
        const data = require(`../utils/locales/${langs}.json`) as Localization
        return data
    }, [langs])

    return texts
}
