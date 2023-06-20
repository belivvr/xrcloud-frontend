// third-party
import firebase from 'firebase/compat/app'
import { NextRouter } from 'next/router'

// project imports
import { UserProfile } from 'types/user-profile'

export type FirebaseContextType = {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
    logout: () => Promise<void>
    login: () => void
    firebaseRegister: (email: string, password: string) => Promise<firebase.auth.UserCredential>
    firebaseEmailPasswordSignIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>
    firebaseGoogleSignIn: () => Promise<firebase.auth.UserCredential>
    resetPassword: (email: string) => Promise<void>
    updateProfile: VoidFunction
}

export type Auth0ContextType = {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
    logout: () => void
    login: () => void
    resetPassword: (email: string) => void
    updateProfile: VoidFunction
}

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

export type JWTCustomContextType = {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
    logout: () => void
    login: (id: string, email: string, token: string) => Promise<void>
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
    resetPassword: (email: string) => void
    updateProfile: (router: NextRouter) => Promise<void>
}

export type AWSCognitoContextType = {
    isLoggedIn: boolean
    isInitialized?: boolean
    user?: UserProfile | null | undefined
    logout: () => void
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<unknown>
    resetPassword: (email: string) => void
}
