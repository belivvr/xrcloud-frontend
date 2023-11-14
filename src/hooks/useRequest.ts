import axios, { AxiosRequestConfig } from 'axios'
import { useCallback } from 'react'
import { useRefresh } from './useRefresh'

export function useRequest() {
    const { renewTokens } = useRefresh()

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
            if (err.response?.status === 401) {
                const { accessToken } = await renewTokens()
                if (method === 'get' || method === 'delete') {
                    const response = await axios[method](path, {
                        ...init,
                        params: init?.params,
                        headers: { Authorization: `bearer ${accessToken}` }
                    })
                    return response.data
                } else {
                    const response = await axios[method](path, body, {
                        ...init,
                        params: init?.params,
                        headers: { Authorization: `bearer ${accessToken}` }
                    })
                    return response.data
                }
            }
            throw err
        }
    },
    [])

    const get = useCallback(
        async function <T>(path: string, init?: AxiosRequestConfig): Promise<T> {
            return request('get', path, init)
        },
        [request]
    )

    const post = useCallback(
        async function <T>(path: string, body: any, init?: AxiosRequestConfig): Promise<T> {
            return request('post', path, init, body)
        },
        [request]
    )

    const patch = useCallback(
        async function <T>(path: string, body: any, init?: AxiosRequestConfig): Promise<T> {
            return request('patch', path, init, body)
        },
        [request]
    )

    const deleteRequest = useCallback(
        async function <T>(path: string, init?: AxiosRequestConfig): Promise<T> {
            return request('delete', path, init)
        },
        [request]
    )

    return { get, post, patch, deleteRequest }
}
