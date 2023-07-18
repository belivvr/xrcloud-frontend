## useRefresh.ts

이 파일은 React의 커스텀 훅인 "useRefresh"를 정의하고 있으며, 이는 사용자의 액세스 토큰과 리프레시 토큰을 갱신하는 기능을 담당합니다. 이 커스텀 훅은 사용자가 로그인 세션을 유지하면서 API를 안전하게 호출할 수 있게 도와줍니다.

```typescript
/**
 * @remarks
 * 이 함수를 사용하면 사용자의 액세스 토큰과 리프레시 토큰을 갱신할 수 있습니다.
 *
 * @returns { accesstoken, refreshtoken } - 갱신된 액세스 토큰과 리프레시 토큰
 *
 */

export function useRefresh() {
    const oldRefreshToken = window.localStorage.getItem('refreshToken')

    const renewTokens = async () => {
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
```
