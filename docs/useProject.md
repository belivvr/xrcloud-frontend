## useProject.ts

이 파일은 프로젝트를 관리하는 기능을 가진 React Hook입니다. 구체적으로 다음과 같은 기능을 제공하고 있습니다.

```typescript
/**
 * @remarks
 * findById 특정 프로젝트를 ID를 통해 찾아서 반환합니다.
 *
 * @params projectId - 찾고자 하는 프로젝트의 ID
 * @returns Project - 찾고자 하는 프로젝트
 *
 */

const findById = async (projectId: string) => {
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
```

```typescript
/**
 * @remarks
 * 새로운 프로젝트를 생성하며, 프로젝트 이름, 상품 이름, 로고, 파비콘 파일을 입력으로 받습니다.
 * 유효하지 않은 입력에 대해서는 알림을 표시하고, 만약 토큰이 만료된 경우 새로운 토큰을 발급받아서 다시 시도합니다.
 * 성공적으로 완료하면 이전 페이지로 이동합니다.
 *
 * @params faviconFile - 프로젝트의 파비콘 파일
 * @params logoFile - 프로젝트의 로고 파일
 * @params projectName - 프로젝트의 이름
 * @params productName - 프로젝트의 상품 이름
 *
 * @returns - 없음
 *
 */

const createsProject = async (faviconFile: File | undefined, logoFile: File | undefined, projectName: string, productName: string) => {
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

    let requestOptions = createRequestOptions('POST', accessToken, formData)

    const data = await fetch('/api/projects/create', requestOptions)
    if (data.status === 401) {
        const retoken = await renewTokens()
        requestOptions = createRequestOptions('POST', retoken.accessToken, formData)
        await fetch('/api/projects/create', requestOptions)
    }

    router.push(`/projects`)
}
```

```typescript
/**
 * @remarks
 * 특정 프로젝트를 업데이트합니다. 프로젝트 ID, 프로젝트 이름, 로고, 파비콘 파일을 입력으로 받습니다.
 * 유효하지 않은 입력에 대해서는 알림을 표시하고, 만약 토큰이 만료된 경우 새로운 토큰을 발급받아서 다시 시도합니다.
 * 성공적으로 완료하면 이전 페이지로 이동합니다.
 *
 * @params faviconFile - 프로젝트의 파비콘 파일
 * @params logoFile - 프로젝트의 로고 파일
 * @params projectName - 프로젝트의 이름
 * @params productName - 프로젝트의 상품 이름
 *
 * @returns - 없음
 *
 */

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
```

```typescript
/**
 * @remarks
 * 특정 프로젝트를 삭제합니다. 만약 삭제 과정에서 오류가 발생하면 콘솔에 에러 메시지를 출력합니다.
 * 성공적으로 완료하면 이전 페이지로 이동합니다.
 *
 * @params projectId - 삭제하고자 하는 프로젝트의 ID
 *
 * @returns - 없음
 *
 */
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
```

```typescript
/**
 * @remarks
 * 특정 프로젝트의 키를 얻습니다. 만약 이 과정에서 오류가 발생하면 콘솔에 에러 메시지를 출력합니다.
 * 동시에 localStorage에 가장 최근에 선택한 키로써 등록합니다.
 *
 * @params projectId - 키를 얻고자 하는 프로젝트의 ID
 *
 * @returns - Project Key (string)
 *
 */
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
        localStorage.setItem('projectId', response.id)
        return response
    } catch (err) {
        console.log(err)
    }
}
```

```typescript
/**
 * @remarks
 * 현재 로컬 상태에서 관리되고 있는 프로젝트 목록을 반환합니다.
 * 이 목록은 처음 컴포넌트가 마운트될 때 모든 프로젝트를 가져와서 설정하며, 이후에는 액세스 토큰이 바뀔 때마다 업데이트됩니다.
 *
 */
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
```
