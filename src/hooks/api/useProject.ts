import useConfig from 'hooks/useConfig'
import { useLocalization } from 'hooks/useLocalization'
import router from 'next/router'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Project } from 'types/project'
import { createRequestOptions } from 'utils/createRequestOptions'
import { useRefresh } from '../useRefresh'
import { useRequest } from '../useRequest'

export function useProject() {
    const [projectList, setProjectList] = useState<Project[]>()
    const { get, patch, deleteRequest } = useRequest()
    const { renewTokens } = useRefresh()
    const { locale } = useConfig()
    const localization = useLocalization(locale)

    const findById = async (projectId: string) => {
        const accessToken = localStorage.getItem('accessToken')

        const response = await get<Project>(`/api/projects/findById`, {
            params: {
                projectId
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        localStorage.setItem('projectId', response.id)
        return response
    }

    const createsProject = async (
        faviconFile: File | undefined,
        logoFile: File | undefined,
        projectName: string,
        productName: string,
        webhookUrl: string | null
    ) => {
        const accessToken = localStorage.getItem('accessToken')

        if (!projectName) {
            enqueueSnackbar(localization['need-project-name'], {
                variant: 'error'
            })
            return
        }

        if (!faviconFile || !logoFile) {
            enqueueSnackbar(localization['need-favicon-logo'], {
                variant: 'error'
            })
            return
        }

        const formData = new FormData()
        formData.append('projectName', projectName)
        formData.append('productName', productName)
        formData.append('favicon', faviconFile)
        formData.append('logo', logoFile)

        if (webhookUrl) {
            formData.append('webhookUrl', webhookUrl)
        }

        let requestOptions = createRequestOptions('POST', accessToken, formData)

        const data = await fetch('/api/projects/create', requestOptions)

        if (data.status === 401) {
            const retoken = await renewTokens()
            requestOptions = createRequestOptions('POST', retoken.accessToken, formData)
            await fetch('/api/projects/create', requestOptions)
        }

        const { statusCode } = await data.json()
        if (statusCode === 400) {
            enqueueSnackbar('Webhook URL 주소가 정확하지 않습니다.', {
                variant: 'error'
            })
            return
        }
        router.push(`/projects`)
    }

    const updateProject = async (
        projectId: string,
        projectName: string,
        webhookUrl: string | null,
        faviconFile: File | undefined,
        logoFile: File | undefined
    ) => {
        const accessToken = localStorage.getItem('accessToken')

        const formData = new FormData()
        formData.append('projectId', projectId)
        formData.append('projectName', projectName)

        if (faviconFile) {
            formData.append('favicon', faviconFile)
        }

        if (logoFile) {
            formData.append('logo', logoFile)
        }

        if (webhookUrl) {
            formData.append('webhookUrl', webhookUrl)
        }

        let requestOptions = createRequestOptions('PATCH', accessToken, formData)

        const data = await fetch('/api/projects/update', requestOptions)
        if (data.status === 401) {
            const retoken = await renewTokens()
            requestOptions = createRequestOptions('PATCH', retoken.accessToken, formData)
            await fetch('/api/projects/update', requestOptions)
        }

        const { statusCode } = await data.json()
        if (statusCode === 400) {
            enqueueSnackbar('Webhook URL 주소가 정확하지 않습니다.', {
                variant: 'error'
            })
            return
        }

        router.push(`/projects`)
    }

    const deleteProject = async (projectId: string) => {
        const accessToken = localStorage.getItem('accessToken')

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
        const accessToken = localStorage.getItem('accessToken')

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
            localStorage.setItem('projectId', response.id)
            return response
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')

        get<{ items: Project[] }>('/api/projects/findAll', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setProjectList(res.items)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [get])

    return { findById, createsProject, updateProject, deleteProject, getProjectKey, projectList }
}
