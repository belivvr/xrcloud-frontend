import { useRouter } from 'next/router'
// project imports
import useAuth from 'hooks/useAuth'
import { GuardProps } from 'types'
import { useEffect } from 'react'
import Loader from 'components/ui-component/Loader'
import useChoicedProject from 'hooks/useChoicedProject'

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
    const { isLoggedIn } = useAuth()
    const router = useRouter()
    const { setChoicedProject, setChoicedScene } = useChoicedProject()

    useEffect(() => {
        if (!isLoggedIn) {
            setChoicedProject(undefined)
            setChoicedScene(undefined)
            router.push('/login')
        }
        // eslint-disable-next-line
    }, [isLoggedIn])

    if (!isLoggedIn) return <Loader />

    return children
}

export default AuthGuard
