'use client'

import LoginForm from "./components/LoginForm"
import { setAuth } from "../../../../slices/authSlice";
import { redirect } from 'next/navigation';

import { useSelector } from "react-redux";

export default function page({}){

    const isUserAuth = useSelector((state) => state.auth.isAuth);

    if(isUserAuth){
        redirect('/dashboard');
    }

    return (
    <>
        <div className="container">
            <LoginForm />
        </div>
    </>
    )
}