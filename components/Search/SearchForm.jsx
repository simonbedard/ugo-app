"use client"

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setTerm, swapPayload, setLoading } from '../../slices/searchSlice'

import Button from '@mui/joy/Button';
import { titleCase } from '../../utils/utils';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/joy/LinearProgress';
import RecentSearch from './RecentSearch';
import SearchColors from './SearchColors';



export default function SearchForm() {

    const searchTerm = useSelector((state) => state.search.term)
    
    const dispatch = useDispatch();
    const [isLoading, setInputLoading] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const [text, setText] = useState(searchTerm);
    
    const formRef = useRef(null)

    const [recentSearch, setRecentSearchRef] = useState([]);

    
    useEffect(() => {
        if(localStorage.getItem('ugo-recent-search')){
            const terms = JSON.parse(localStorage.getItem('ugo-recent-search'));
            setRecentSearchRef(terms);
        }
        document.addEventListener('_manualSearch', function({ detail }) {
          setText(detail.terms);
        });
    }, []);


    /**
     * Handle form submission
     * @param {*} event 
     */
    function formSubmited(event) {
        event.preventDefault();
        const formData = new FormData(event.target)
        search(formData);
    }

    function recentSearchClick(item){
      setText(item)
    }

    function search(formData){
      const page = 1;
      if(text === "")return;


      // ParseString to title case
      const parseText = titleCase(text)
      
      dispatch(setLoading(true));
      setInputLoading(true)

      let filters = {};

      if(formData.get('color') != ''){
        filters.color = formData.get('color')
      }
      fetch(`http://localhost/api/search/terms/${parseText}/${page}?${new URLSearchParams(filters)}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(swapPayload(data));
                   
          var allEntries = JSON.parse(localStorage.getItem("ugo-recent-search")) || [];
          if(!allEntries.includes(parseText)){
            if(allEntries.length > 10){
              allEntries.pop();
            }
            allEntries.unshift(parseText); 
            // Save allEntries back to local storage and state
            setRecentSearchRef(allEntries)
            localStorage.setItem("ugo-recent-search", JSON.stringify(allEntries));
          }

        }).catch((error) => {
            console.log(error);
        }).finally(() => {
          setInputLoading(false);
          dispatch(setLoading(false));
          dispatch(setTerm(parseText))
        });
    }

    
    function delayBlur(){
      setTimeout(()=>{
        setFocused(false);
      }, 200)
    }

    return (
        <>
          <div className="ugo-serach-wrapper">
             <form  onSubmit={formSubmited}>
                <Input
                sx={{
                    "background": "#000000",
                    "color": "white",
                    "--joy-palette-neutral-softHoverColor": "white",
                    "--Input-minHeight": "50px"
                    }}
                value={text}
                variant="soft"
                placeholder="Find you free image ..."
                startDecorator={<SearchIcon />}
                endDecorator={<Button loading={isLoading} type="submit">Search</Button>}
                onFocus={event => (recentSearch.length > 0 ? setFocused(true) : null)}
                onBlur={event => delayBlur()}
                onChange={event => setText(event.target.value)}
                />
              <SearchColors />
            </form>
            {isLoading ? <LinearProgress thickness={1} />: ''}

            {/* Show only when input is focus */}
            {isFocused ? <RecentSearch recentSearchClick={recentSearchClick} list={recentSearch}/>: ''}
           

          </div>
        </>
    )
}