"use client"
import { getCookie } from "../../../../../utils/utils"; 
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from "../../../../../slices/authSlice";

export default function SignUpForm({}) {

    const dispatch = useDispatch();

    /**
     * Fetch CRFT Session token from Api service
     */
    fetch("http://localhost/sanctum/csrf-cookie", {
        credentials: "include"
    });

    /**
     * Handle the form signe submition
     * @param {*} event 
     */
    function handleSignUp(event){
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const dataObject = { 
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation'),
        };

        const API_AUTH_SIGNU_URL = `http://localhost/auth/register`;
        
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
            if(data.messa)
            dispatch(setAuth(true));
        }).catch((error) => {
            dispatch(setAuth(false));
        });
   
      

    }
    return (
        <>
            <form className="ugo-auth-form" onSubmit={handleSignUp}>
                <div className="input span-2">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" defaultValue="Simon"/>
                </div>
     
                <div className="input span-2">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="ugo@gmail.com" defaultValue="ugo@ugo.com"/>
                </div>

                <div className="input">
                    <label>Password</label>
                    <input type="text" name="password" defaultValue="simon55*"/>
                </div>
                <div className="input">
                    <label> Password confirmation</label>
                    <input type="password" name="password_confirmation" defaultValue="simon55*"/>
                </div>
                <div className="input span-2">
                    <input type="submit" defaultValue="Signup" />
                </div>
            </form>
        </>
    )
}
