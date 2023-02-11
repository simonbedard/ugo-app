'use client'

export default function UgoTrendingSearch() {

    const Trendings = ["Super bowl", "Black and white", "Snowstorm", "Tiktok", "Ukraine", "Netflix", "Interior design", "SpaceX"]

    function HandleTrendingClick(item){
      const customEvent = new CustomEvent('_manualSearch', { detail: { terms: item } });
      document.dispatchEvent(customEvent);
    }

    return (
        <>
          <div className='ugo-trending-search'>
            <h4 className="ugo-trending-search__head">Trending now</h4>
            <ul>
                {Trendings.map((item, index) => (
                    <li key={index} onClick={() => HandleTrendingClick(item)}>{item}</li>
                ))}
            </ul>
          </div>
            
        </>
    )
}