## useRequest.ts

이 파일은 "useRequest"라는 React의 커스텀 훅을 정의하고 있습니다. 이 훅은 HTTP 요청을 수행하기 위한 get, post, patch, delete 함수를 제공합니다.

요청을 수행하는 중에 401(Unauthorized) 오류가 발생하면, 이전에 정의한 "useRefresh" 훅을 이용해 토큰을 새로 갱신하고, 갱신된 토큰을 이용해 요청을 재시도합니다.

```typescript
/**
 * @remarks
 * 이 함수는 각각의 요청 GET, POST, PATCH, DELETE 메서드가 Token 만료로 401 오류가 발생했을 때,
 * Token을 갱신하고, 갱신된 Token을 이용해 요청을 재시도하는 기능을 제공합니다.
 *
 * @params method - 요청 메서드
 * @params path - 요청 경로
 * @params init - AxiosRequestConfig
 * @params body - 요청 바디
 *
 * @returns T - 요청 결과
 *
 */

const request = useCallback(async function <T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    path: string,
    init?: AxiosRequestConfig,
    body?: any
): Promise<T> {
    try {
        if (method === 'get' || method === 'delete') {
            const response = await axios[method](path, init)
            return response.data
        } else {
            const response = await axios[method](path, body, init)
            return response.data
        }
    } catch (err: any) {
        console.log(err)
        if (err.response?.status === 401) {
            const { accessToken } = await renewTokens()
            const newParams = Object.assign(init?.params, { accessToken })
            if (method === 'get' || method === 'delete') {
                const response = await axios[method](path, { ...init, params: newParams })
                return response.data
            } else {
                const response = await axios[method](path, body, { ...init, params: newParams })
                return response.data
            }
        }
        throw err
    }
}, [])
```

```typescript
/**
 * @remarks
 * 이 함수는 HTTP GET 요청을 수행하는 기능을 제공합니다.
 *
 * @params path - 요청 경로
 * @params init - AxiosRequestConfig
 *
 * @returns T - 요청 결과
 *
 */
const get = useCallback(
    async function <T>(path: string, init?: AxiosRequestConfig): Promise<T> {
        return request('get', path, init)
    },
    [request]
)
```

```typescript
/**
 * @remarks
 * 이 함수는 HTTP POST 요청을 수행하는 기능을 제공합니다.
 *
 * @params path - 요청 경로
 * @params body - 요청 바디
 * @params init - AxiosRequestConfig
 *
 * @returns T - 요청 결과
 *
 */
const post = useCallback(
    async function <T>(path: string, body: any, init?: AxiosRequestConfig): Promise<T> {
        return request('post', path, init, body)
    },
    [request]
)
```

```typescript
/**
 * @remarks
 * 이 함수는 HTTP PATCH 요청을 수행하는 기능을 제공합니다.
 *
 * @params path - 요청 경로
 * @params init - AxiosRequestConfig
 *
 * @returns T - 요청 결과
 *
 */
const patch = useCallback(
    async function <T>(path: string, body: any, init?: AxiosRequestConfig): Promise<T> {
        return request('patch', path, init, body)
    },
    [request]
)
```

```typescript
/**
 * @remarks
 * 이 함수는 HTTP DELETE 요청을 수행하는 기능을 제공합니다.
 * delete로 통일하려 했으나, delete는 예약어이기 때문에 deleteRequest로 이름을 변경했습니다.
 *
 * @params path - 요청 경로
 * @params init - AxiosRequestConfig
 *
 * @returns T - 요청 결과
 *
 */
const deleteRequest = useCallback(
    async function <T>(path: string, init?: AxiosRequestConfig): Promise<T> {
        return request('delete', path, init)
    },
    [request]
)
```
