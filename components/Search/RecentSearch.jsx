"use client"
import { History, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setTerm } from '../../slices/searchSlice'



export default function RecentSearch(context, { }) {
    const [recentSearch, setRecentSearchRef] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('ugo-recent-search')){
            const terms = JSON.parse(localStorage.getItem('ugo-recent-search'));
            setRecentSearchRef(terms);
        }
    }, []);  

    /**
     * Remove item from the history search
     * @param {*} text 
     */
    function remove(text){
        let history = JSON.parse(localStorage.getItem("ugo-recent-search"));
        history = history.filter(function (el) {
            return el !== text;
        });
        // Save allEntries back to local storage and state
        setRecentSearchRef(history)
        localStorage.setItem("ugo-recent-search", JSON.stringify(history));
    }

    /**
     * Set current search text
     * @param {*} text 
     */
    function search(text) {
        dispatch(setTerm(text))
    }

    return (
        <>

      {recentSearch.length > 0 ? (
        <ul>
            { recentSearch.map((item, key) =>
                <li key={key} className="term py-2">
                    <div className="row">
                        <p className='text-sm text-muted-foreground flex align-center' onClick={() => search(item)}>
                            <History className='h-4 w-4 mr-2'/>{item}
                        </p>
                        <div className="term__close" onClick={() => remove(item)}>
                            <X className='h-4 w-4'/>
                        </div>
                    </div>
                </li>
            )}
        </ul>
      ) : (
        <p className='text-sm'>The search history is empty</p>
      )}
    
        

        </>
    )
}