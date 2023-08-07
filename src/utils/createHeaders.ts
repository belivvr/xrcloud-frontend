import { Project } from 'types/project'

export function createHeaders(project: Project) {
    const accessToken = localStorage.getItem('accessToken')

    return {
        'X-XRCLOUD-PROJECT-ID': project.id,
        Authorization: `bearer ${accessToken}`
    }
}
