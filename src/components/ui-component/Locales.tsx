import React, { useState, useEffect } from 'react'

// third-party
import { IntlProvider, MessageFormatElement } from 'react-intl'
import useConfig from 'hooks/useConfig'
import { KO_JSON } from './localeJSON'

// load locales files
const loadLocaleData = (locale: string) => {
    switch (locale) {
        default:
            return import('../../utils/locales/ko.json')
    }
}

// ==============================|| LOCALIZATION ||============================== //
interface LocalsProps {
    children: React.ReactNode
}

const Locales = ({ children }: LocalsProps) => {
    const { locale } = useConfig()
    const [messages, setMessages] = useState<Record<string, string> | Record<string, MessageFormatElement[]> | undefined>(KO_JSON)

    useEffect(() => {
        loadLocaleData(locale).then((d: { default: Record<string, string> | Record<string, MessageFormatElement[]> | undefined }) => {
            setMessages(d.default)
        })
    }, [locale])

    return (
        <>
            <IntlProvider locale={locale} defaultLocale="ko" messages={messages}>
                {children}
            </IntlProvider>
        </>
    )
}

export default Locales
