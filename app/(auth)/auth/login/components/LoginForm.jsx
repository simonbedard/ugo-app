"use client"
import { getCookie } from "../../../../../utils/utils"; 
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from "../../../../../slices/authSlice";
import { redirect } from 'next/navigation';

export default function LoginForm({}) {

    const dispatch = useDispatch();


    /**
     * Handle the form signe submition
     * @param {*} event 
     */
    function handleLogin(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObject = { 
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const API_AUTH_SIGNU_URL = `http://localhost/auth/login`;
        
        fetch(API_AUTH_SIGNU_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
            },
            body: JSON.stringify(dataObject),
        }).then((res) => res.json())
        .then((data) => {
            dispatch(setAuth(true));
        }).catch((error) => {
            dispatch(setAuth(false));
        });
   
      

    }
    return (
        <>
            <form className="ugo-auth-form" onSubmit={handleLogin}>
                <div className="input span-2">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="ugo@gmail.com" defaultValue="ugo@ugo.com"/>
                </div>

                <div className="input span-2">
                    <label>Password</label>
                    <input type="text" name="password" defaultValue="simon55*"/>
                </div>
                <div className="input span-2">
                    <input type="submit" value="Log In" />
                </div>
            </form>
        </>
    )
}
