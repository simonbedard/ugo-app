"use client"
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'next/navigation';
/**
 * Import components
 */

export default function Page() {
    const isUserAuth = useSelector((state) => state.auth.isAuth);
    
    if(!isUserAuth){
        redirect('/auth/login');
    }

    

    return (
        <>    
            <div className="wrapper">
                <h1>Welcome to the dashboard</h1>
            </div>
        </>
    )
}