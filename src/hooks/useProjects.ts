import { useEffect, useState } from 'react'
import { Project } from 'types/project'
import { useRequest } from './useRequest'

export function useProjects() {
    const [projectList, setProjectList] = useState<Project[]>()

    const { get } = useRequest()
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        get<{ items: Project[] }>('/api/projects/findAll', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                setProjectList(res.items)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [accessToken, get])

    return { projectList }
}
