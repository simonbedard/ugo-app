'use client'
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react";
export default function UgoTrendingSearch() {

    function HandleTrendingClick(item){
      const customEvent = new CustomEvent('_manualSearch', { detail: { terms: item } });
      document.dispatchEvent(customEvent);
    }

    /**
     * Get list of trending word.
     * @returns 
     */
    const  TrendingFeed = async () => {
      await new Promise(r => setTimeout(r, 2000));
      const Trendings = ["Black and white", "Snowstorm", "Tiktok", "Ukraine", "Netflix", "SpaceX"]
      return (
        <>
          {Trendings.map((item, index) => (
              <li key={index} onClick={() => HandleTrendingClick(item)} className="cursor-pointer opacity-60 hover:opacity-100 hover:underline">{item}</li>
          ))}
        </>
      )
    }

    /**
     * Skeleton trending feed
     * @returns 
     */
    const SkeletonFeed = () => {
      return (
        <>
          <li><Skeleton className="w-[90px] h-[12px]  bg-background" /></li>
          <li><Skeleton className="w-[120px] h-[12px]  bg-background" /></li>
          <li><Skeleton className="w-[70px] h-[12px]  bg-background" /></li>
          <li><Skeleton className="w-[90px] h-[12px]  bg-background" /></li>
          <li><Skeleton className="w-[120px] h-[12px]  bg-background" /></li>
        </>
      )
    }

    return (
        <>
          
          <div className='ugo-trending-search bg-secondary border-b'>
            <div className="container flex">
              <h4 className="ugo-trending-search__head p-4 border-r  bold" >Trending now</h4>
              <ul className="flex flex-1  w-auto p-4 gap-4 items-center">
                <Suspense fallback={<SkeletonFeed />}>
                  <TrendingFeed />
                </Suspense>
              </ul>
            </div>
           
          </div>
            
        </>
    )
}


