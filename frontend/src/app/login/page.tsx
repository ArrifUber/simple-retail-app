'use client'
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    console.log(email, password)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await api.post('/auth/login', {
                email,
                password
            })
            const token = response.data.token
            if(token){
                localStorage.setItem('token', token)
                router.push('/dashboard')
            }
            console.log(response.data)
        } catch (error) {
            console.error('Terjadi kesalahan: ', error)
            setError('Email atau password yang anda masukkan salah')
        } finally {
            setLoading(false)
        }
    }
    return(
        <div>
            <form onSubmit={handleLogin} className="flex gap-4 items-center justify-center border rounded-md p-8">
                <input type="email" name="email" id="email" placeholder="your email..."  className="border p-2" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder="your password..." className="border p-2" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="border bg-gray-300 rounded-md hover:opacity-75 py-2 px-4" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default LoginPage