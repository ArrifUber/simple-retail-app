'use client'
import useProtectedRoute from "@/hooks/useProtectedRoute";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const {isProtected, loading} = useProtectedRoute()

   if(loading || !isProtected){
    return <p>Loading...</p>
   }
  return <div>{children}</div>;
};


export default ProtectedLayout
