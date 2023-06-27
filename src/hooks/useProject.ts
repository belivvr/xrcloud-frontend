import router from 'next/router'
import { useState } from 'react'
import { Project } from 'types/project'
import { createRequestOptions } from 'utils/createRequestOptions'
import useProjectKey from './useChoicedProject'
import { useRefresh } from './useRefresh'
import { useRequest } from './useRequest'

export function useProject() {
    const { get, patch, deleteRequest } = useRequest()
    const { renewTokens } = useRefresh()
    const { projectKey, setProjectKey } = useProjectKey()

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

    const handleUpdateProject = async (
        projectId: string,
        projectName: string,
        faviconFile: File | undefined,
        logoFile: File | undefined
    ) => {
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

    const handleDeleteProject = async (projectId: string) => {
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

    const handleGetProjectKey = async (projectId: string) => {
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
            setProjectKey(response.projectKey)
            return response
        } catch (err) {
            console.log(err)
        }
    }

    return { findById, handleUpdateProject, handleDeleteProject, handleGetProjectKey }
}
