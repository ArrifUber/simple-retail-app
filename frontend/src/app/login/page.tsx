"use client"

import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"


const LoginPage = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        // panggil login dari useAuth
        await login(email, password)
        // redirect ke dashboard setelah berhasil
        router.push('/dashboard')
    }

     return (
        // buat form login sederhana
        <form onSubmit={handleLogin} className="flex bg-slate-700 flex-col p-4 gap-4">
            <input type="email" name="email" id="email" className="border" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" id="password" className="border" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button type="submit" className="border">Log In</button>
        </form>
    )
}



export default LoginPage