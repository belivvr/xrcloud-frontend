import { Project } from 'types/project'

export function createHeaders(project: Project) {
    return {
        'X-XRCLOUD-PROJECT-ID': project.id,
        Authorization: `bearer ${project.projectKey}`
    }
}
