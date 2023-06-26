export const createRequestOptions = (method: 'POST' | 'PATCH', token: string | null, body: FormData): RequestInit => {
    return {
        method,
        headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, compress, deflate, br',
            Authorization: `Bearer ${token}`
        },
        body
    }
}
