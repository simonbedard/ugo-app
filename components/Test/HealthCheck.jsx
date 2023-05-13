import { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setApiRunning } from "../../slices/globalSlice";

export default function HealthCheck() {
    return (
        <>  
         <div className="ugo-healthCheck">
            <Suspense fallback={<Loading />}>
                <CheckApi />
            </Suspense>
         </div>

        </>
    )
}


function CheckApi(){
    const _isApiRunning = useSelector((state) => state.global.isApiRunning);
    const dispatch = useDispatch(); 
    
   useEffect(() => {
        fetch("http://localhost/api/health").then((e) => {
            dispatch(setApiRunning(true))
        }).catch((error) => {
            dispatch(setApiRunning(false))
        });
    }, [])


    if(_isApiRunning == null){
        return <p>...</p>
    }else{
        return (<>
            <p>{(_isApiRunning.payload ? `The Api backend service is running` : `The Api backend service is not running` )}</p>
        </>)
    }



}

function Loading() {
    return <h2>🌀 Loading...</h2>;
}
  