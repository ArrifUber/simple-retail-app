import { useState, useEffect } from 'react'
import api from '../lib/api'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // cek token saat pertama load
    useEffect(() => {
        // ambil token dari localStorage
        const token = localStorage.getItem('token')
        if(token){
            // kalau ada → set user
            const decode = jwtDecode(token)
            setUser(decode)
            setLoading(false)
        } else {
            // kalau tidak ada → set loading false
            setLoading(false)
        }
    }, [])

    const login = async (email: string, password: string) => {
        // kirim ke POST /auth/login
        const response = await api.post('/auth/login', {email, password})
        // simpan token ke localStorage
        localStorage.setItem('token', response.data.token)
        // set user
        const decode = jwtDecode(response.data.token)
        setUser(decode)
    }

    const logout = () => {
        // hapus token dari localStorage
        localStorage.removeItem('token')
        // set user jadi null
        setUser(null
        )
    }

    return { user, loading, login, logout }
}

export default useAuth