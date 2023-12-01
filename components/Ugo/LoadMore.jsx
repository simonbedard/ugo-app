import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setTerm, swapPayload } from '../../slices/searchSlice'
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react"

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function LoadMore() {

    const payload = useSelector((state) => state.search.payload);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const { toast } = useToast()
    const isApiRunning = useSelector((state) => state.global.isApiRunning).payload;

    function LoadNextPage(){

        if(isApiRunning){
          setLoading(true)
          fetch(payload.page.next_url)
            .then((res) => res.json())
            .then((data) => {
              // Combine old assets with new one
              const combine =  [...payload.assets, ...data.assets];
            
              data.assets = combine
              
              console.log(data)

              dispatch(swapPayload(data));
            }).catch((error) => {

            }).finally(() => {
              setTimeout(() => {
                setLoading(false);
              }, 300);
              
          });
        }else{
          toast({
            title: "Sorry !",
            description: "Cannot load more. The API status is down.",
            action: (
              <ToastAction altText="Goto schedule to undo">Status</ToastAction>
            ),
          });
        }
        
    }

    return (
        <>
          <div className='loadmore'>
            <Button onClick={LoadNextPage} >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Load More
            </Button>
          </div>
        </>
    )
}