import React, { createContext, useEffect, useReducer, useState } from 'react'

import { LOGIN, LOGOUT } from 'store/actions'
import accountReducer from 'store/accountReducer'

// project imports
import axios from 'utils/axios'
import { InitialLoginContextProps } from 'types'
import { AuthProfileResponse, AuthResponseToken, CreateUser, GenerateApiKey, XRCloudAuthContextType } from 'types/auth'
import { useRequest } from 'hooks/useRequest'

const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
}

const user = {
    email: 'admin@admin.com',
    role: 'admin'
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
    const [adminId, setAdminId] = useState<string>('')
    const { get, post, patch, deleteRequest } = useRequest()

    useEffect(() => {
        const init = async () => {
            const checkToken = window.localStorage.getItem('accessToken')
            if (checkToken) {
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
        }
        init()
    }, [])

    const login = async (email: string, password: string) => {
        const { accessToken, refreshToken } = await post<AuthResponseToken>('/api/auth/login', {
            email,
            password
        })
        const { apiKey } = await get<AuthProfileResponse>(`/api/auth/profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey)
        }
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
                Authorization: `bearer ${accessToken}`
            }
        })

        setAdminId(profile.id)
        setReceivedApiKey(profile.apiKey)
        if (profile.apiKey) {
            localStorage.setItem('apiKey', profile.apiKey)
        }
        return profile
    }

    const generateApiKey = async () => {
        const accessToken = window.localStorage.getItem('accessToken')
        const { id } = await getProfile()

        const { apiKey } = await post<GenerateApiKey>(`/api/admins/generateApiKey?adminId=${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        setReceivedApiKey(apiKey)
        if (apiKey) {
            localStorage.setItem('apiKey', apiKey)
        }
    }

    const resetPassword = (email: string) => console.log(email)

    const updateProfile = () => {}

    const updatePassword = async (oldPassword: string, newPassword: string) => {
        const { id } = await getProfile()
        const accessToken = window.localStorage.getItem('accessToken')
        return post<void>(
            '/api/auth/updatePassword',
            {
                id,
                oldPassword,
                newPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
    }

    const withdraw = () => {
        const accessToken = window.localStorage.getItem('accessToken')
        return deleteRequest<void>('/api/auth/withdraw', {
            params: {
                adminId
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    return (
        <XRCloudAuthContext.Provider
            value={{
                ...state,
                receivedApiKey,
                login,
                logout,
                register,
                resetPassword,
                updateProfile,
                getProfile,
                generateApiKey,
                updatePassword,
                withdraw
            }}
        >
            {children}
        </XRCloudAuthContext.Provider>
    )
}

export default XRCloudAuthContext
