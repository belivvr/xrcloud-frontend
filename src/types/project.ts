export interface XRCloudProject {
    id: string
    product: 'hub'
    title: string
    favicon: URL
    logo: URL
    createdAt: Date
    updatedAt: Date
    scenes: Scene[]
    rooms: Room[]
}

export interface Scene {
    id: string
    thumbnail: URL
}

export interface Room {
    id: string
    sceneId: string
    title: string
    customData: any
    size: number
    autoScale: boolean
    thumbnail: URL
}

export type URL = string
