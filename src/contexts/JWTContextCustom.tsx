import React, { createContext, useEffect, useReducer } from 'react'

// third-party
import { Chance } from 'chance'
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'
import { JWT_API } from 'config'
import { JWTCustomContextType, JWTData } from 'types/auth'
// constant
const JWT_SECRET = JWT_API.secret
const JWT_EXPIRES_TIME = JWT_API.timeout
// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions'
import accountReducer from 'store/accountReducer'

// project imports
import Loader from 'ui-component/Loader'
import axios from 'utils/axios'
import { InitialLoginContextProps, KeyedObject } from 'types'
import { JWTContextType } from 'types/auth'
import { NextRouter, useRouter } from 'next/router'

const chance = new Chance()

const initialState: InitialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
}

const verifyToken: (st: string, rt: string) => Promise<boolean> = async (serviceToken, refreshToken) => {
    if (!serviceToken) {
        return false
    }
    const decoded: KeyedObject = jwtDecode(serviceToken)

    if (decoded.exp < Date.now() / 1000) {
        try {
            /**
             * TODO: Refresh token
             * */
        } catch (err) {
            console.log(err)
            throw err
        }
        return true
    }

    return decoded.exp > Date.now() / 1000
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
