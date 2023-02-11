"use client"

import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';


const HeroContainer = styled(Container)(({ theme }) => ({
    height: "60vh",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: '20px 40px',
  }));

export default function HeroText() {
    return (
        <>  
        <div className="hero hero--text">
            <HeroContainer  sx={(theme) => theme.typography.h1}>
                <h1><span className="txt-primary">Meet Ugo</span><br/>An Open Source, search engine that helps you find free images to use anywhere.</h1>
            </HeroContainer>
        </div>
        </>
    )
}