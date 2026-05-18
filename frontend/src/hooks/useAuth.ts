'use client'
import { jwtDecode, JwtPayload } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



const useAuth = () => {
    const [user, setUser] = useState<JwtPayload | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkToken = () => {
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    return
                }
                const decodedToken = jwtDecode(token)
                setUser(decodedToken)
            } catch (error) {
                console.error('Invalid Token: ', error)
            } finally {
                setLoading(false)
            }
        }
        checkToken()
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        setUser({})
        router.push('/login')
    }

    return {user, loading, logout}
}


export default useAuth