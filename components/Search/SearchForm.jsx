"use client"

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setTerm, swapPayload, setLoading } from '../../slices/searchSlice'
import { titleCase } from '../../utils/utils';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation'
import { Loader2, Settings2 } from "lucide-react"

// Form import
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useForm } from "react-hook-form"

import RecentSearch from './RecentSearch';



export default function SearchForm() {
    const form = useForm()
    const searchTerm = useSelector((state) => state.search.term)
    const { toast } = useToast()
    const router = useRouter()
    const dispatch = useDispatch();
    const [isLoading, setInputLoading] = useState(false);
    const [isFocused, setFocused] = useState(false);
    const [text, setText] = useState(searchTerm);
    const _isApiRunning = useSelector((state) => state.global.isApiRunning).payload;

    
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
        const inappropriateWords = ['Porn', 'Sex']
        if(inappropriateWords.includes(titleCase(text))){
          setText('');
          toast({
            title: "Inappropriate search",
            description: "Regrettably, certain terms have been omitted from our search engine's parameters. Our search criteria are designed to exclude content that may be considered explicit or of inappropriate nature.",
          });
          return;

        } 
      
        if(_isApiRunning){
          search(formData);
        }else{
          toast({
            title: "Sorry !",
            description: "The Search feature is currently unavailable.",
            action: (
              <ToastAction altText="Goto schedule to undo">See Status</ToastAction>
            ),
          })
        }
    }

    function recentSearchClick(item){
      setText(item)
    }

    function recentSearchRemoveClick(text){
          let allEntries = JSON.parse(localStorage.getItem("ugo-recent-search"));
            allEntries = allEntries.filter(function (el) {
                return el !== text;
            });
            // Save allEntries back to local storage and state
            setRecentSearchRef(allEntries)
            localStorage.setItem("ugo-recent-search", JSON.stringify(allEntries));
          
    }

    function search(formData){

      
      const page = 1;

      if(isLoading)return;
      if(text === "")return;


      // ParseString to title case
      const parseText = titleCase(text);

      router.push(`/search/${parseText}`);

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
          <Form {...form}>
                <form onSubmit={formSubmited(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>

          {/*
          <div className="ugo-serach-wrapper">
             <form  onSubmit={formSubmited}>

             <div className="flex w-full items-center space-x-2">
                <Input type="text"  
                  value={text}
                  placeholder="Find you free image ..."
                  onFocus={event => (recentSearch.length > 0 ? setFocused(true) : null)}
                  onBlur={event => delayBlur()}
                  onChange={event => setText(event.target.value)}/>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">

                        <p>Choose colors</p>
                        <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />

                        <ul>
                          <li>Chose color</li>
                          <li>Select provider</li>
                          <li>Activate safe search</li>
                        </ul>
                    </PopoverContent>
                  </Popover>
              
                  <Button type="submit">
                  { isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Search
                  </Button>
              </div>
             
            </form>

            {isFocused ? <RecentSearch recentSearchClick={recentSearchClick} recentSearchRemoveClick={recentSearchRemoveClick} list={recentSearch}/>: ''}
           
                          </div>*/}
        </>
    )
}