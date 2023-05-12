import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setTerm, swapPayload } from '../../slices/searchSlice'

export default function LoadMore() {

    const payload = useSelector((state) => state.search.payload);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    function LoadNextPage(){

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
    }

    return (
        <>
          <div className='loadmore'>
            <button onClick={LoadNextPage}>Load More</button>
          </div>
        </>
    )
}