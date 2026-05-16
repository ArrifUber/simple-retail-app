'use client'
import useProtectedRoute from '@/hooks/useProtectedRoute'

const DashboardPage = () => {
    const { user, loading } = useProtectedRoute()

    if (loading) return <p>Loading...</p>

    console.log(user)
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Selamat datang, {user?.username}!</p>
        </div>
    )
}

export default DashboardPage