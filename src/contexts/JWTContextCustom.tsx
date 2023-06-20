import React, { createContext, useEffect, useReducer } from 'react'

// third-party
import { Chance } from 'chance'
import jwtDecode from 'jwt-decode'
import { JWTCustomContextType } from 'types/auth'
// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions'
import accountReducer from 'store/accountReducer'

// project imports
import Loader from 'ui-component/Loader'
import axios from 'utils/axios'
import { InitialLoginContextProps, KeyedObject } from 'types'
import { useRouter } from 'next/router'

const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
}

const setSession = (serviceToken?: string | null) => {
    if (serviceToken) {
        localStorage.setItem('accessToken', serviceToken)
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTCustomContextType | null>(null)

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState)
    const router = useRouter()

    useEffect(() => {
        const init = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken') || ''
                const refreshToken = localStorage.getItem('refreshToken') || ''
                axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

                if (accessToken) {
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user: {
                                email: 'test' || '',
                                id: 'test',
                                name: 'admin'
                            }
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

    const login = async (id: string, email: string, token: string) => {
        const user = {
            id,
            email,
            name: 'admin'
        }
        setSession(token)
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        })
    }

    const register = async (email: string, password: string, firstName: string, lastName: string) => {}

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('lastUpdatedBy')
        setSession(null)
        dispatch({ type: LOGOUT })
        router.push('/login')
    }

    const resetPassword = (email: string) => console.log(email)

    const updateProfile = async () => {}

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />
    }

    return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
}

export default JWTContext
