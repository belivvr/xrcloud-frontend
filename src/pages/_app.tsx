import { ReactElement, ReactNode, useEffect, useState } from 'react'
// import { ProjectContext, Project } from 'custom/ProjectContext'

// global styles
import '../styles/globals.css'
import '../scss/style.scss'

// next
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

// third-party
import { Provider } from 'react-redux'

// project-import
import { store } from '../store'
import ThemeCustomization from '../themes'
import NavigationScroll from '../layout/NavigationScroll'
import { ConfigProvider } from '../contexts/ConfigContext'

// import RTLLayout from 'ui-component/RTLLayout';
import Locales from 'ui-component/Locales'
import Snackbar from 'ui-component/extended/Snackbar'

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/XRCloudAuthContext'
import { ChoicedProjectProvider } from 'contexts/ChoicedProjectContext'
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';
import { SnackbarProvider } from 'notistack'
import useConfig from 'hooks/useConfig'

// types
type LayoutProps = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

interface Props {
    Component: LayoutProps
}

function MyApp({ Component, pageProps }: AppProps & Props) {
    const getLayout = Component.getLayout ?? ((page: any) => page)
    const { onChangePresetColor } = useConfig()

    useEffect(() => {
        onChangePresetColor('theme6')
    }, [])
    return (
        <Provider store={store}>
            <ConfigProvider>
                <ThemeCustomization>
                    {/* <RTLLayout> */}
                    <Locales>
                        <NavigationScroll>
                            <AuthProvider>
                                <ChoicedProjectProvider>
                                    <SnackbarProvider
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                        maxSnack={3}
                                        autoHideDuration={5000}
                                    >
                                        <>
                                            {getLayout(<Component {...pageProps} />)}
                                            <Snackbar />
                                        </>
                                    </SnackbarProvider>
                                </ChoicedProjectProvider>
                            </AuthProvider>
                        </NavigationScroll>
                    </Locales>
                    {/* </RTLLayout> */}
                </ThemeCustomization>
            </ConfigProvider>
        </Provider>
    )
}

export default MyApp
