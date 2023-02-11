"use client"

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setTerm, swapPayload } from '../../slices/searchSlice'

import Button from '@mui/joy/Button';

import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/joy/LinearProgress';
import RecentSearch from './RecentSearch';
import SearchColors from './SearchColors';



export default function SearchForm() {

    const searchTerm = useSelector((state) => state.search.term)
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
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
      if(text === "")return;
      const page = 1;

      setLoading(true)

      let filters = {};

      if(formData.get('color') != ''){
        filters.color = formData.get('color')
      }

      fetch(`http://localhost/api/search/terms/${text}/${page}?${new URLSearchParams(filters)}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(swapPayload(data));
                   
          var allEntries = JSON.parse(localStorage.getItem("ugo-recent-search")) || [];
          if(!allEntries.includes(text)){
            if(allEntries.length > 10){
              allEntries.pop();
            }
            allEntries.unshift(text); 
            // Save allEntries back to local storage and state
            setRecentSearchRef(allEntries)
            localStorage.setItem("ugo-recent-search", JSON.stringify(allEntries));
          }

        }).catch((error) => {
            console.log(error);
        }).finally(() => {
          setLoading(false);
          dispatch(setTerm(text))
        });
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
                onBlur={event => setFocused(false)}
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