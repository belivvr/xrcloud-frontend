export interface Project {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    projectKey: string
    logoUrl: URL
    faviconUrl: URL
    sceneCreationUrl: URL
}

export interface Scene {
    id: string
    name: string
    sceneUrl: URL
    thumbnailUrl: URL
    sceneModificationUrl: URL
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
    roomUrl: {
        static: { guest: URL; host: URL }
        public: { guest: URL; host: URL }
    }
    thumbnailUrl: URL
    returnUrl: URL
}

export interface RoomField {
    title: string
    id: string
    label: string
    isDisabled: boolean
}

export interface CreateRoom {
    createdAt: Date
    id: string
    infraRoomId: string
    name: string
    ownerId: string
    sceneId: string
    size: number
    thumbnailId: string
    updatedAt: Date
    version: number
}

export type URL = string

export interface Permission {
    id: string
    sceneId: string
    name: string
    customData: any
    object: boolean
    flight: boolean
    ban: boolean
    userMute: boolean
    audioAmp: boolean
    mediaCreationTransfer: boolean
    penDraw: boolean
    cameraCreate: boolean
    emojiCreate: boolean
}

export interface PermissionCheckField {
    title: string
    id: string
}

export interface UploaderProps {
    htmlFor: string
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>
    setThumbnailUrl: React.Dispatch<React.SetStateAction<string>>
}
