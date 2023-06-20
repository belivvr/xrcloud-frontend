// project imports
import { UserProfile } from 'types/user-profile'

export interface JWTData {
    userId: string
}

export type JWTContextType = {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
    logout: () => void
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
    resetPassword: (email: string) => void
    updateProfile: VoidFunction
}

export type JWTContextCustomType = {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
    logout: () => void
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
    resetPassword: (email: string) => void
    updateProfile: VoidFunction
}

export interface InitialLoginContextProps {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
}
