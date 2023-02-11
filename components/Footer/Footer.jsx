"use client"

import Image from 'next/image';
import Typography from '@mui/joy/Typography';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@mui/material/styles';
import GithubIcon from '@mui/icons-material/GitHub';

const FooterContainer = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#161616',
    padding: '20px 40px',
  }));

export default function Footer() {
    return (
        <>
            <footer>
                <FooterContainer>
                    <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                        <Grid xs>
                            <Typography level="body2" component="p">Copyright © Ugo®. All rights reserved.</Typography>
                        </Grid>
                        <Grid xs>
                            <Typography level="body2" component="p" sx={{
                                justifyContent: "flex-end",
                                display: 'flex',
                                alignItems: "center",
                            }}>
                                <GithubIcon sx={{ marginRight: "20px"}}/>Version Alpha.v1.0.040223
                            </Typography>
                        </Grid>
                    </Grid>
                </FooterContainer>
            </footer>
        </>
    )
}