"use client"

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setTerm, swapPayload, setLoading } from '../../slices/searchSlice'
import { titleCase } from '../../utils/utils';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import RecentSearch from './RecentSearch';



export default function SearchForm() {

    const searchTerm = useSelector((state) => state.search.term)
    const { toast } = useToast()

    const dispatch = useDispatch();
    const [isLoading, setInputLoading] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const [text, setText] = useState(searchTerm);
    const _isApiRunning = useSelector((state) => state.global.isApiRunning);
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
        if(_isApiRunning){
          const formData = new FormData(event.target)
          search(formData);
        }else{
          toast({
            title: "Sorry !",
            description: "The Search feature is currently unavailable.",
            action: (
              <ToastAction altText="Goto schedule to undo">Status</ToastAction>
            ),
          })
        }

        

    }

    function recentSearchClick(item){
      setText(item)
    }

    function search(formData){
      const page = 1;

      if(isLoading)return;
      if(text === "")return;


      // ParseString to title case
      const parseText = titleCase(text)
      
      dispatch(setLoading(true));
      setInputLoading(true)

      let filters = {};

      if(formData.get('color') != ''){
        filters.color = formData.get('color')
      }

      /**
       * The query is slightly defferent if no query parameters 
       */
      let query;
      if(filters.color){
        query = `http://localhost/api/search/terms/${parseText}/${page}?${new URLSearchParams(filters)}`
      }else{
        query = `http://localhost/api/search/terms/${parseText}/${page}`
      }

      fetch(query)
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
          setTimeout(() => {
            setInputLoading(false);
            dispatch(setLoading(false));
          }, 1000)
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

             <div className="flex w-full items-center space-x-2">
                <Input type="text"  
                  value={text}
                  placeholder="Find you free image ..."
                  onFocus={event => (recentSearch.length > 0 ? setFocused(true) : null)}
                  onBlur={event => delayBlur()}
                  onChange={event => setText(event.target.value)}/>
                  <Button type="submit">Search</Button>
              </div>
             
            </form>

            {/* Show only when input is focus */}
            {isFocused ? <RecentSearch recentSearchClick={recentSearchClick} list={recentSearch}/>: ''}
           
          </div>
        </>
    )
}