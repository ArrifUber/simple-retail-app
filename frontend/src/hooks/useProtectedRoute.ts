'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from './useAuth'

const useProtectedRoute = () => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading])

    return { user, loading }
}

export default useProtectedRoute