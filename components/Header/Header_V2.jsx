"use client"

import Image from 'next/image';
import imageLogo from '../../public/assets/global/logo.svg';
import Link from 'next/link';


import SearchForm from '../Search/SearchForm';

import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/utils';
import { setAuth, setUserProfile } from '../../slices/authSlice';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';




export default function Header() {

    const dispatch = useDispatch();
    const isUserAuth = useSelector((state) => state.auth.isAuth);
    const userProfile = useSelector((state) => state.auth.profile);
    const _isApiRunning = useSelector((state) => state.global.isApiRunning);

 

    const API_AUTH_PROFILE_URL = `http://localhost/api/user`;
    
    useEffect(() => {
        /**
         * Fetch CRFT Session token from Api service
         */
        const SessionCookie = getCookie('XSRF-TOKEN');
        if(_isApiRunning){
            if(SessionCookie){
                // Dont need to fetch it agains
                getUser();
            }else{
                fetchCookieCSRF();
                getUser();
            }
        
            async function fetchCookieCSRF(){
                await fetch("http://localhost/sanctum/csrf-cookie", {
                    credentials: "include"
                });
            }
        }

    }, []);
    
    useEffect(() => {
        const isObjectEmpty = (objectName) => {
            return Object.keys(objectName).length === 0
        }
        if(isUserAuth){
            if(isObjectEmpty(userProfile)){
                getUser();
            }
        }   
    }, [isUserAuth]);

    async function getUser(){
        await fetch(API_AUTH_PROFILE_URL, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
            }
        })
        .then((res) => {
            if(res.status == 401){
                console.log("User is not Unauthenticated on app first load");
                dispatch(setAuth(false));
                dispatch(setUserProfile({}));
            }else{
                console.log("User is authenticated on app first load");
                
                dispatch(setAuth(true));

               res.json().then((profile) => {
                    dispatch(setUserProfile(profile))
                });
         
            }

        }).catch((error) => {
            console.log('No auth');
            dispatch(setAuth(false));
            dispatch(setUserProfile({}))
        });
    }

    function logout() {
        const API_AUTH_PROFILE_URL = `http://localhost/auth/logout`;
        fetch(API_AUTH_PROFILE_URL, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "X-XSRF-TOKEN": getCookie('XSRF-TOKEN')
            }
        })
        .then((res) => {
            dispatch(setAuth(false));
            dispatch(setUserProfile({}))
            console.log('User has been logout succsefully');
        }).catch((error) => {
            console.log(error);
        });
    }


    const HeaderAuthLinks = ({}) => {

        if(isUserAuth){
            return <>
                <Link href='/dashboard'>Hey {userProfile.name}</Link>
                <span className='logout' onClick={logout}>Logout</span>
            </>
        }else{
            return <>
                <Link href='/auth/login'>Login</Link>
                <Link href='/auth/sign-up'>Sign up</Link>

            </>
        }

    }
    
    return (
        <>
            <header>
                <Link href="/">
                    <Image src={imageLogo} alt="Ugo app logo" />
                </Link>
                <SearchForm />
                <HeaderAuthLinks />           
            </header>
        </>
    )
}