"use client"

import Image from 'next/image';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@mui/material/styles';

import imageLogo from '../../public/assets/global/logo.svg';
import SettingsIcon from '@mui/icons-material/Settings';

import Link from 'next/link';
import Button from '@mui/joy/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import SearchForm from '../Search/SearchForm';

import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/utils';
import { setAuth, setUserProfile } from '../../slices/authSlice';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';





const HeaderContainer = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#161616',
    padding: '20px 40px',
}));

export default function Header() {

    const dispatch = useDispatch();
    const isUserAuth = useSelector((state) => state.auth.isAuth);
    const userProfile = useSelector((state) => state.auth.profile);

 

    const API_AUTH_PROFILE_URL = `http://localhost/api/user`;
    
    useEffect(() => {
        /**
         * Fetch CRFT Session token from Api service
         */
        const SessionCookie = getCookie('XSRF-TOKEN');
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
                <Button component="a" href='/auth/sign-up'variant="outlined" sx={{
                    margin: "0 40px 0px 20px"
                }}>Sign Up</Button>
            </>
        }

    }
    
    return (
        <>
            <header>
                <HeaderContainer>
                    <Grid container spacing={3} alignItems="center">
                        <Grid xs>
                            <Link href="/">
                                <Image src={imageLogo} alt="Ugo app logo" />
                            </Link>
                        </Grid>
                        <Grid xs={5}>
                            <SearchForm />
                        </Grid>
                        <Grid xs sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            padding: 0,
                        }}>
                            
                            <HeaderAuthLinks />
                           
                           <DarkModeIcon 
                            sx={{ color: "#fff", margin: "0 10px"}}
                            />
                           <SettingsIcon 
                            sx={{ color: "#fff", margin: "0 10px" }}
                            />
                            
                        </Grid>
                    </Grid>
                </HeaderContainer>
            </header>
        </>
    )
}