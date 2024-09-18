import { LAYOUT_CONST } from 'constant'

// types
import { ConfigProps } from 'types/config'
import { RoomField, Permission, PermissionCheckField } from 'types/project'
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

export const roomFields: RoomField[] = [
    { title: 'date-of-room-creation', id: 'createdAt', label: 'date-of-room-creation', isDisabled: true },
    { title: 'date-of-room-update', id: 'updatedAt', label: 'date-of-room-update', isDisabled: true },
    { title: 'room-id', id: 'id', label: 'room-id', isDisabled: true },
    { title: 'scene-id', id: 'sceneId', label: 'scene-id', isDisabled: true },
    { title: 'room-name', id: 'name', label: 'room-name', isDisabled: false },
    { title: 'custom-data', id: 'customData', label: 'custom-data', isDisabled: false },
    { title: 'room-size', id: 'roomSize', label: 'room-size', isDisabled: false }
]

export const mockPermission: Permission = {
    id: v4(),
    sceneId: v4(),
    name: 'BTS',
    customData: 'Room 1 test',
    object: true,
    flight: true,
    ban: true,
    userMute: true,
    audioAmp: false,
    mediaCreationTransfer: true,
    penDraw: true,
    cameraCreate: false,
    emojiCreate: false
}

export const permissionFields: RoomField[] = [
    { title: 'name', id: 'name', label: 'name', isDisabled: false },
    { title: 'custom-data', id: 'custom-data', label: 'custom-data', isDisabled: false }
]

export const permissionCheckFields: PermissionCheckField[] = [
    { title: 'create-object', id: 'object' },
    { title: 'flight', id: 'flight' },
    { title: 'ban', id: 'ban' },
    { title: 'user-mute', id: 'userMute' },
    { title: 'audio-amplification', id: 'audioAmp' },
    { title: 'media-creation-and-transfer', id: 'mediaCreateMove' },
    { title: 'pen-drawing', id: 'penDraw' },
    { title: 'camera-creation', id: 'cameraCreate' },
    { title: 'emoji-creation', id: 'emojiCreate' }
]

export default config
