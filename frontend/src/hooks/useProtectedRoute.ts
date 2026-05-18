'use client'
import { use, useEffect, useState } from "react"
import useAuth from "./useAuth"
import { useRouter } from "next/navigation"

const useProtectedRoute = () => {
    const {user, loading} = useAuth()
    const [isProtected, setIsProtected] = useState(false)
    const router = useRouter()

    useEffect(() => {
        console.log('loading: ', loading)
        const checkUser = () => {
            if(user){
                setIsProtected(true)
                console.log('masuk')
                console.log(user)
            } else {
                router.push('/login')
                console.log(user)
                console.log('tidak masuk')
            }
        }
        if(!loading){
            checkUser()
        }
    }, [user, loading, router])

    return {isProtected, loading}
}


export default useProtectedRoute