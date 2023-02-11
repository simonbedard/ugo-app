"use client"

import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Link from 'next/link'
import LoadMore from './LoadMore';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';

export default function UgoImageGrid() {

    const payload = useSelector((state) => state.search.payload);
    const term = useSelector((state) => state.search.term)
    
    return (
        <>  
        
            <div className="">
                <Container maxWidth="xl">
                    <div className="row">
                        <div>
                            <h3 style={{textAlign: "center"}}>Searching for: <span className="txt-primary"> {term}</span></h3>
                            
                        </div>
                        <List
                            orientation="horizontal"
                            wrap
                            sx={{
                                justifyContent: "flex-end",
                                margin: "20px 20px 40px 20px",
                                '--List-gap': '8px',
                                '--List-item-radius': '20px',
                            }}
                            >
                            {[
                                'Unsplash',
                                'Pexel',
                                'Pixabay',
                                'Deposite',
                            ].map((item, index) => (
                                <ListItem key={item}>
                                <Checkbox
                                    overlay
                                    disableIcon
                                    variant="soft"
                                    label={item}
                                />
                                </ListItem>
                            ))}
                            </List>
                        </div>
                    <ImageList variant="masonry" cols={4} gap={20}>
                        {payload.assets.map((item, index) => ( 
                        <ImageListItem key={index} className="ugo-image">
                            <Link href={`/file/${item.provider.toLowerCase()}/${item.id}`}>
                                <img 
                                style={{width: "100%"}}
                                id={item.id} 
                                src={item.src} 
                                />
                                <div className='content'>
                                    <small>{item.provider} - {item.id}</small>
                                </div>
                            </Link>

                        </ImageListItem>
                        ))}
                    </ImageList>

                    <LoadMore />
                </Container>

            </div>
        </>
    )
}