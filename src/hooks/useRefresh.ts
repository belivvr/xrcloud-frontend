import axios from 'axios'

export interface Tokens {
    accessToken: string
    refreshToken: string
}

export function useRefresh() {
    const renewTokens = async () => {
        const oldRefreshToken = window.localStorage.getItem('refreshToken')
        try {
            const { data } = await axios.post(`/api/auth/refresh`, {
                params: {
                    refreshToken: oldRefreshToken
                }
            })
            const { accessToken, refreshToken } = data

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            return { accessToken, refreshToken }
        } catch (err) {
            throw err
        }
    }

    return { renewTokens }
}
