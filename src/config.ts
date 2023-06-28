import { buttonGroupClasses, popoverClasses } from '@mui/material'
import { IconButterfly } from '@tabler/icons'
import { LAYOUT_CONST } from 'constant'

// types
import { ConfigProps } from 'types/config'
import { Room, RoomField, Scene, Permission, PermissionCheckField } from 'types/project'
import { v4 } from 'uuid'

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '/projects'

export const DASHBOARD_PATH = '/projects'
export const HORIZONTAL_MAX_ITEM = 6

const config: ConfigProps = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER, // default, mini-drawer
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    container: false
}

export const mockRoom: Room = {
    id: v4(),
    sceneId: v4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Room 1',
    customData: 'Room 1 test',
    roomSize: 6,
    autoScale: false,
    roomUrl: 'https://www.google.com',
    thumbnailUrl: '/assets/images/maintenance/img-slider-layout1.png'
}

export const mockSceneList: Scene[] = [
    {
        id: mockRoom.sceneId,
        name: 'Creator',
        sceneUrl: 'https://www.google.com',
        thumbnailUrl: '/assets/images/maintenance/img-slider-layout1.png'
    },
    {
        id: v4(),
        name: 'Creator',
        sceneUrl: 'https://www.google.com',
        thumbnailUrl: '/assets/images/maintenance/img-slider-layout1.png'
    },
    {
        id: v4(),
        name: 'Creator',
        sceneUrl: 'https://www.google.com',
        thumbnailUrl: '/assets/images/maintenance/img-slider-layout1.png'
    },
    {
        id: v4(),
        name: 'Creator',
        sceneUrl: 'https://www.google.com',
        thumbnailUrl: '/assets/images/maintenance/img-slider-layout1.png'
    }
]

export const roomFields: RoomField[] = [
    { title: 'projects.hubs.rooms.created', id: 'createdAt', label: 'Created', isDisabled: true },
    { title: 'projects.hubs.rooms.updated', id: 'updatedAt', label: 'Updated', isDisabled: true },
    { title: 'projects.hubs.rooms.id', id: 'id', label: 'ID', isDisabled: true },
    { title: 'projects.hubs.rooms.scene-id', id: 'sceneId', label: 'sceneID', isDisabled: true },
    { title: 'projects.hubs.rooms.name', id: 'name', label: 'Name', isDisabled: false },
    { title: 'projects.hubs.rooms.customData', id: 'customData', label: 'Custom Data', isDisabled: false },
    { title: 'projects.hubs.rooms.roomSize', id: 'roomSize', label: 'Room Size', isDisabled: false }
]

export const mockPermission: Permission = {
    id: v4(),
    sceneId: v4(),
    name: 'BTS',
    customData: 'Room 1 test',
    object: true,
    flight: true,
    dropout: true,
    userMute: true,
    audioAmp: false,
    mediaCreationTransfer: true,
    penDraw: true,
    cameraCreate: false,
    emojiCreate: false
}

export const permissionFields: RoomField[] = [
    { title: '이름', id: 'name', label: '이름', isDisabled: false },
    { title: 'projects.hubs.permissions.custom-data', id: 'custom-data', label: 'projects.hubs.permissions.custom-data', isDisabled: false }
]

export const permissionCheckFields: PermissionCheckField[] = [
    { title: '오브젝트 고정', id: 'object' },
    { title: '비행', id: 'flight' },
    { title: '강퇴', id: 'dropout' },
    { title: '유저 음소거', id: 'userMute' },
    { title: '오디오 증폭', id: 'audioAmp' },
    { title: '미디어 생성 및 이동', id: 'mediaCreateMove' },
    { title: '펜그리기', id: 'penDraw' },
    { title: '카메라 생성', id: 'cameraCreate' },
    { title: '이모지 생성', id: 'emojiCreate' }
]

export default config
