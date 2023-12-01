"use client"

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setTerm, swapPayload, setLoading } from '../../slices/searchSlice'
import { titleCase } from '../../utils/utils';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from 'next/navigation'
import { Loader2, Settings2, History } from "lucide-react"
import RecentSearch from './RecentSearch';

// Form import
import { Input } from "@/components/ui/input"
import { Checkbox } from 'components/ui/checkbox';
import {
  Form,
  FormControl,
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

import { useForm, setValue } from "react-hook-form"



export default function SearchForm2() {

  const searchTerm = useSelector((state) => state.search.term)

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchTerm,
      colors: [],
      providers: [],
      safe_search: true,
    },
  })
  
  useEffect(() => {
    form.setValue("search", searchTerm)
}, [searchTerm]);  

  const colors = [
    {
      id: "red",
      label: "Red",
    },
    {
      id: "blue",
      label: "Blue",
    },
    {
      id: "green",
      label: "Green",
    },
    {
      id: "yellow",
      label: "Yellow",
    },
    {
      id: "black_white",
      label: "Black and white",
    },
  ];

  const providers = [
    {
      id: "unsplash",
      label: "Unsplash",
    },
    {
      id: "pexel",
      label: "Pexel",
    },
    {
      id: "pixabay",
      label: "Pixabay",
    },
    {
      id: "deposite",
      label: "Deposite",
    },
    {
      id: "flickr",
      label: "Flickr",
    },
  ]

  

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  
    return (
        <>
          <div className="flex-1 max-w-lg">
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                    <div className="flex flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="border-r-0 rounded-r-none	">
                            <History className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <RecentSearch  />
                        </PopoverContent>
                      </Popover>
                
                      <FormField
                            control={form.control}
                            name="search"
                           
                            render={({ field }) => (
                              <FormItem  className="flex-1">
                                <FormControl>
                                  <Input  className="rounded-none" value={searchTerm} type="text" placeholder="Search terms" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="secondary" className="rounded-l-none">
                            <Settings2 className="h-4 w-4 " />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                        <p className='text-lg mb-1 mt-2'>Colors filters</p>
                        {colors.map((color) => (
                          <FormField
                            key={color.id}
                            control={form.control}
                            name="colors"
                            render={({ field }) => {
                              
                              const classes = `flex flex-row items-start space-x-3 space-y-0 p-1`;
                              return (
                                <FormItem
                                  key={color.id}
                                  className={classes}
                                >
                                  
                                  <FormControl>
                                   
                                    <Checkbox
                                      checked={field.value?.includes(color.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, color.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== color.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className={`font-normal text-${color.id}-500`}>
                                    {color.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <p className='text-lg mb-1 mt-2'>Providers filters</p>
                        {providers.map((provider) => (
                          <FormField
                            key={provider.id}
                            control={form.control}
                            name="providers"
                            render={({ field }) => {
      
                              return (
                                <FormItem
                                  key={provider.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 p-1"
                                >
                                   
                                  <FormControl>
                                   
                                    <Checkbox
                                      checked={field.value?.includes(provider.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, provider.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== provider.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {provider.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        </PopoverContent>
                      </Popover >
                    </div>

      
                    <Button type="submit">Search</Button>
                  </form>
                </Form>
          </div>

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