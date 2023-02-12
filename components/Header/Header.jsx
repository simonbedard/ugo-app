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

const HeaderContainer = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#161616',
    padding: '20px 40px',
  }));

export default function Header() {
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
                            <Link href='/auth/login'>Login</Link>

                            <Button component="a" href='/auth/sign-up'variant="outlined" sx={{
                                margin: "0 40px 0px 20px"
                            }}>Sign Up</Button>
                           
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