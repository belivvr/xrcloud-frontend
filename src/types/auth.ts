// project imports
import { UserProfile } from 'types/user-profile'
import { Project, Scene } from './project'

export interface JWTData {
    userId: string
}

export interface AuthResponseToken {
    accessToken: string
    refreshToken: string
}

export interface AuthProfileResponse {
    id: string
    email: string
    apiKey: string
}

export type CreateUser = {
    id: string
    email: string
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

export type GenerateApiKey = {
    id: string
    apiKey: string
    email: string
}

export type XRCloudAuthContextType = {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
    receivedApiKey: string | undefined
    logout: () => void
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string) => Promise<CreateUser>
    resetPassword: (email: string) => void
    updateProfile: VoidFunction
    getProfile: () => Promise<AuthProfileResponse>
    generateApiKey: () => Promise<void>
    updatePassword: (oldPassword: string, newPassword: string) => Promise<void>
    withdraw: () => Promise<void>
}

export type ProjectContextType = {
    choicedProject: Project | undefined
    choicedScene: string | undefined
    setChoicedProject: React.Dispatch<React.SetStateAction<Project | undefined>>
    setChoicedScene: React.Dispatch<React.SetStateAction<string | undefined>>
}

export interface InitialLoginContextProps {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
}
