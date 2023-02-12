"use client"

import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Link from 'next/link'
import LoadMore from './LoadMore';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Checkbox from '@mui/joy/Checkbox';
import { height } from '@mui/system';

import Image from 'next/image';


export default function UgoImageGrid() {

    const payload = useSelector((state) => state.search.payload);
    const term = useSelector((state) => state.search.term);
    const stateLoading = useSelector((state) => state.search.loading)
    
    const [checkedState, setCheckedState] = useState([]);

    function handleOnChange(e, item){
        if(e.target.checked){
            setCheckedState([...checkedState, item]);
        }else{
            const filteredArray = checkedState.filter(function(e) { return e !== item });
            setCheckedState(filteredArray);
        }
    }

    /**
     * Logic to filter components visibility
     * @returns React component
     */
    const ImageComponent = ({item, index}) => {

        if(checkedState.includes(item.provider) || checkedState.length == 0){
            return <ImageListItem className="ugo-image" sx={{
                aspectRatio: reduce(item.width , item.height)
            }}>
                <Link href={`/file/${item.provider.toLowerCase()}/${item.id}`}>

                    <Image
                    src={item.src} 
                    width={item.width}
                    height={item.height}
                    priority={true}
                    alt=""
                    onLoadingComplete={(el) => {
                        el.closest('.ugo-image').classList.add('is-loaded')
                    }}
                    />
                   
                    
                    <div className='content'>
                        <small>{index} - {item.provider} - {item.id}</small>
                    </div>
                </Link>
            </ImageListItem>
        }else{
            return
        }


    }

    // Simplified fraction by finding the GCD and dividing by it.
    function reduce(number,denomin){
        var gcd = function gcd(a,b){
            return b ? gcd(b, a%b) : a;
        };
        gcd = gcd(number,denomin);
        return `${number/gcd}/${denomin/gcd}`;
    }

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
                                        onChange={(e) => handleOnChange(e, item)}
                                    />
                                </ListItem>
                            ))}
                            </List>
                        </div>
                        {stateLoading ? 
                        <ImageList className='fake-loading-grid' variant="masonry" cols={3} gap={20}>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                            <div className="fake-image"></div>
                        </ImageList>
                        : 
                        <ImageList variant="masonry" cols={3} gap={20}>
                            {payload.assets.map((item, index) => ( 
                                <ImageComponent key={index} index={index} item={item} />
                            ))}
                        </ImageList>
 }
              
                        <LoadMore />
                </Container>

            </div>
        </>
    )
}