import { string } from 'yup'

export interface Localization {
    'project-manage': string
    projects: string
    scenes: string
    rooms: string
    permissions: string
    avatars: string
    emojis: string
    '3d-models': string
    blank: string
    product: string
    'project-name': string
    favicon: string
    logo: string
    'project-key': string
    'creation-date': string
    'last-update': string
    'add-project': string
    browse: string
    add: string
    cancel: string
    upload: string
    update: string
    delete: string
    create: string
    modify: string
    name: string
    'immutable-object': string
    flight: string
    ban: string
    'user-mute': string
    'audio-amplification': string
    'media-creation-and-transfer': string
    'pen-drawing': string
    'camera-creation': string
    'emoji-creation': string
    'click-project': string
    'select-project-id': string
    'create-project': string
    attachment: string
    'get-issued': string
    [key: string]: string
}
