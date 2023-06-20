import React, { createContext, useEffect, useReducer } from 'react'

// third-party
import { Chance } from 'chance'
import jwtDecode from 'jwt-decode'

// constant

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions'
import accountReducer from 'store/accountReducer'

// project imports
import Loader from 'ui-component/Loader'
import axios from 'utils/axios'
import { InitialLoginContextProps, KeyedObject } from 'types'
import { JWTContextCustomType } from 'types/auth'

const chance = new Chance()

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

const verifyToken: (st: string) => boolean = (serviceToken) => {
    if (!serviceToken) {
        return false
    }
    const decoded: KeyedObject = jwtDecode(serviceToken)
    console.log(decoded.exp > Date.now() / 1000)
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000
}

const setSession = (serviceToken?: string | null, refreshToken?: string | null) => {
    if (serviceToken && refreshToken) {
        localStorage.setItem('serviceToken', serviceToken)
        localStorage.setItem('refreshToken', refreshToken)
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`
    } else {
        localStorage.removeItem('serviceToken')
        localStorage.removeItem('refreshToken')
        delete axios.defaults.headers.common.Authorization
    }
}

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContextCustom = createContext<JWTContextCustomType | null>(null)

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState)

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken')
                const refreshToken = window.localStorage.getItem('refreshToken')

                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken, refreshToken)
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
        /** TODO: LOGIN API
         * 1. call login api (/api/auth/login)
         * 2. get access token and refresh token
         * 3. set session
         */

        const accessToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzQ4MDczNjAwLCJpYXQiOjE1MTYyMzkwMjJ9.oL57RAuF2Z5-puMjPWNWbjZ-JQZizmfTv-bTEDV9XrU'
        const refreshToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzQ4MDczNjAwLCJpYXQiOjE1MTYyMzkwMjJ9.oL57RAuF2Z5-puMjPWNWbjZ-JQZizmfTv-bTEDV9XrU'
        setSession(accessToken, refreshToken)
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        })
    }

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        const id = chance.bb_pin()
        const response = await axios.post('/api/account/register', {
            id,
            email,
            password,
            firstName,
            lastName
        })
        let users = response.data

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users')
            users = [
                ...JSON.parse(localUsers!),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ]
        }

        window.localStorage.setItem('users', JSON.stringify(users))
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: LOGOUT })
    }

    const resetPassword = (email: string) => console.log(email)

    const updateProfile = () => {}

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />
    }

    return (
        <JWTContextCustom.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>
            {children}
        </JWTContextCustom.Provider>
    )
}

export default JWTContextCustom
