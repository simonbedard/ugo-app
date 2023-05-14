'use client'

export default function UgoTrendingSearch() {

    const Trendings = ["Super bowl", "Black and white", "Snowstorm", "Tiktok", "Ukraine", "Netflix", "Interior design", "SpaceX"]

    function HandleTrendingClick(item){
      const customEvent = new CustomEvent('_manualSearch', { detail: { terms: item } });
      document.dispatchEvent(customEvent);
    }

    return (
        <>
          <div className='ugo-trending-search flex border-b '>
            <h4 className="ugo-trending-search__head p-4 border-r bg-secondary bold" >Trending now</h4>
            <ul className="flex flex-1  w-auto p-4 gap-4 bg-secondary">
                {Trendings.map((item, index) => (
                    <li key={index} onClick={() => HandleTrendingClick(item)} className="cursor-pointer opacity-60 hover:opacity-100 hover:underline">{item}</li>
                ))}
            </ul>
          </div>
            
        </>
    )
}