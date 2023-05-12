"use client"


import { useSelector } from 'react-redux';
import { useState } from 'react';
import { reduce } from "../../utils/utils";
import Link from 'next/link'
import LoadMore from './LoadMore';
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
            return <Link  className="ugo-image" href={`/file/${item.provider.toLowerCase()}/${item.id}`}>

                    {/*
                    <Image
                    src={item.src} 
                    width={item.width}
                    height={item.height}
                    priority={true}
                    alt=""
                    onLoadingComplete={(el) => {
                        el.closest('.ugo-image').classList.add('is-loaded')
                    }}
                    />*/}

                    <div className='content'>
                        <small>{index} - {item.provider} - {item.id}</small>
                    </div>
                </Link>
        }else{
            return
        }


    }



    const GridComponent = ({}) => {
        if(payload.assets.length > 0){
            return <>
            <div className="row">
                <div>
                    <h3 style={{textAlign: "center"}}>Searching for: <span className="txt-primary"> {term}</span></h3>
                </div>
                {[
                    'Unsplash',
                    'Pexel',
                    'Pixabay',
                    'Deposite',
                ].map((item, index) => (
                    <p key={index}>{item}</p>
                ))}

            </div>
            {stateLoading ? 
            <div className='images-grid fake-loading-grid'>
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
            </div>
            : 
            <div className='images-grid'>
                {payload.assets.map((item, index) => ( 
                    <ImageComponent key={index} index={index} item={item} />
                ))}
            </div>
            }
            <LoadMore />
            </>
        }else{
            return <>
                <h3 style={{textAlign: "center"}}>No results found for: <span className="txt-primary"> {term}</span></h3>
            </>
        }
    }

    return (
        <div>
            <GridComponent />
        </div>
    )
}