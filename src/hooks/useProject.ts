import router from 'next/router'
import { Project } from 'types/project'
import { createRequestOptions } from 'utils/createRequestOptions'
import { useRefresh } from './useRefresh'
import { useRequest } from './useRequest'

export function useProject() {
    const { get, patch, deleteRequest } = useRequest()
    const { renewTokens } = useRefresh()

    const accessToken = localStorage.getItem('accessToken')

    const findById = async (projectId: string) => {
        const response = await get<Project>(`api/projects/findById`, {
            params: {
                projectId
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        localStorage.setItem('projectKey', response.projectKey)
        return response
    }

    const createsProject = async (faviconFile: File | undefined, logoFile: File | undefined, projectName: string, productName: string) => {
        if (!faviconFile || !logoFile) return alert('파비콘과 로고를 모두 등록해주세요')

        const formData = new FormData()
        formData.append('projectName', projectName)
        formData.append('productName', productName)
        formData.append('favicon', faviconFile)
        formData.append('logo', logoFile)

        let requestOptions = createRequestOptions('POST', accessToken, formData)

        const data = await fetch('/api/projects/create', requestOptions)
        if (data.status === 401) {
            const retoken = await renewTokens()
            requestOptions = createRequestOptions('POST', retoken.accessToken, formData)
            await fetch('/api/projects/create', requestOptions)
        }

        const { projectKey } = await data.json()
        localStorage.setItem('projectKey', projectKey)

        router.push(`/projects`)
    }

    const updateProject = async (projectId: string, projectName: string, faviconFile: File | undefined, logoFile: File | undefined) => {
        const formData = new FormData()
        formData.append('projectId', projectId)
        formData.append('projectName', projectName)

        if (faviconFile) {
            formData.append('favicon', faviconFile)
        }

        if (logoFile) {
            formData.append('logo', logoFile)
        }

        let requestOptions = createRequestOptions('PATCH', accessToken, formData)

        const data = await fetch('/api/projects/update', requestOptions)
        if (data.status === 401) {
            const retoken = await renewTokens()
            requestOptions = createRequestOptions('PATCH', retoken.accessToken, formData)
            await fetch('/api/projects/update', requestOptions)
        }

        router.push(`/projects`)
    }

    const deleteProject = async (projectId: string) => {
        try {
            await deleteRequest('/api/projects/delete', {
                params: {
                    projectId
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            router.push('/projects')
        } catch (err) {
            console.log(err)
        }
    }

    const getProjectKey = async (projectId: string) => {
        try {
            await patch(
                '/api/projects/getIssueKey',
                {
                    projectId
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            const response = await findById(projectId)
            localStorage.setItem('projectKey', response.projectKey)
            return response
        } catch (err) {
            console.log(err)
        }
    }

    return { findById, createsProject, updateProject, deleteProject, getProjectKey }
}
