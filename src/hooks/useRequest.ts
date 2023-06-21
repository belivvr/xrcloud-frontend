import axios, { AxiosRequestConfig } from 'axios'
import { useCallback } from 'react'
import { useRefresh } from './useRefresh'

export function useRequest() {
    const { renewTokens } = useRefresh()

    const request = useCallback(async function <T>(
        method: 'get' | 'post' | 'patch',
        path: string,
        init?: AxiosRequestConfig,
        body?: any
    ): Promise<T> {
        try {
            const response = await axios[method](path, body, init)
            return response.data
        } catch (err: any) {
            if (err.response?.status === 401) {
                const { accessToken } = await renewTokens()
                const newParams = Object.assign(init?.params, { accessToken })
                const response = await axios[method](path, body, { ...init, params: newParams })
                return response.data
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

    return { get, post, patch }
}
