import React, { createContext, useEffect, useReducer, useState } from 'react'

// third-party
import jwtDecode from 'jwt-decode'

// constant

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions'
import accountReducer from 'store/accountReducer'

// project imports
import Loader from 'ui-component/Loader'
import axios from 'utils/axios'
import { InitialLoginContextProps, KeyedObject } from 'types'
import { AuthProfileResponse, AuthResponseToken, CreateUser, GenerateApiKey, XRCloudAuthContextType } from 'types/auth'
import { Tokens, useRefresh } from 'hooks/useRefresh'
import { useRequest } from 'hooks/useRequest'

type VerifyToken = (st: string, renewToken: () => Promise<Tokens>) => Promise<boolean>

// constant
const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
}

const user = {
    email: 'admin@admin.com',
    role: 'admin'
}

const verifyToken: VerifyToken = async (accessToken, renewToken) => {
    if (!accessToken) {
        return false
    }
    const decoded: KeyedObject = jwtDecode(accessToken)
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    if (decoded.exp > Date.now() / 1000) {
        return true
    } else {
        try {
            await renewToken()
            return true
        } catch (err) {
            return false
        }
    }
}

const setSession = (accessToken?: string | null, refreshToken?: string | null) => {
    if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        delete axios.defaults.headers.common.Authorization
    }
}

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const XRCloudAuthContext = createContext<XRCloudAuthContextType | null>(null)

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState)
    const [receivedApiKey, setReceivedApiKey] = useState<string>()
    const { renewTokens } = useRefresh()
    const { get, post, patch } = useRequest()

    useEffect(() => {
        const init = async () => {
            try {
                const checkToken = window.localStorage.getItem('accessToken')

                if (checkToken) {
                    const isTokenValid = await verifyToken(checkToken, renewTokens)
                    if (!isTokenValid) throw new Error('Invalid token')
                    const accessToken = window.localStorage.getItem('accessToken')
                    const refreshToken = window.localStorage.getItem('refreshToken')

                    setSession(accessToken, refreshToken)
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    })
                } else {
                    dispatch({
                        type: LOGOUT
                    })
                }
            } catch (err) {
                dispatch({
                    type: LOGOUT
                })
            }
        }

        init()
    }, [])

    const login = async (email: string, password: string) => {
        const { accessToken, refreshToken } = await post<AuthResponseToken>('/api/auth/login', {
            email,
            password
        })
        const { adminId, apiKey } = await get<AuthProfileResponse>(`/api/auth/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey)
        }
        localStorage.setItem('adminId', adminId)
        setSession(accessToken, refreshToken)
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        })
    }

    const register = async (email: string, password: string) => {
        const data = await post<CreateUser>('/api/admins/creates', {
            email,
            password
        })

        return data
    }

    const logout = () => {
        setSession(null)
        localStorage.removeItem('adminId')
        localStorage.removeItem('apiKey')
        dispatch({ type: LOGOUT })
    }

    const getProfile = async () => {
        const accessToken = window.localStorage.getItem('accessToken')
        const profile = await get<AuthProfileResponse>(`/api/auth/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        setReceivedApiKey(profile.apiKey)
        if (profile.apiKey) {
            localStorage.setItem('apiKey', profile.apiKey)
        }
        return profile
    }

    const genrateApiKey = async () => {
        const accessToken = window.localStorage.getItem('accessToken')
        const { apiKey } = await patch<GenerateApiKey>(
            `/api/admins/generateApiKey`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        setReceivedApiKey(apiKey)
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey)
        }
    }

    const resetPassword = (email: string) => console.log(email)

    const updateProfile = () => {}

    // if (state.isInitialized !== undefined && !state.isInitialized) {
    //     return <Loader />
    // }

    return (
        <XRCloudAuthContext.Provider
            value={{ ...state, receivedApiKey, login, logout, register, resetPassword, updateProfile, getProfile, genrateApiKey }}
        >
            {children}
        </XRCloudAuthContext.Provider>
    )
}

export default XRCloudAuthContext
