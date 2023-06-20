import { useEffect, useState } from 'react'

export function useModel() {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])

    return { loading }
}
