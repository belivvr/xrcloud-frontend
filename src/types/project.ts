export interface Project {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    projectId: string
    projectKey: string
    logoUrl: URL
    faviconUrl: URL
}

export interface Scene {
    id: string
    sceneUrl: URL
    thumbnailUrl: URL
}

export interface Room {
    id: string
    sceneId: string
    createdAt: Date
    updatedAt: Date
    name: string
    customData: any
    roomSize: number
    autoScale: boolean
    roomUrl: URL
    thumbnailUrl: URL
}

export interface RoomField {
    title: string
    id: string
    label: string
    isDisabled: boolean
}

export type URL = string
