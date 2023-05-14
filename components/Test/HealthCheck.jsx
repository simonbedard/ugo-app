import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setApiRunning } from "../../slices/globalSlice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HealthCheck() {
    return <CheckApi />
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

            <Alert
            className="fixed bottom-6 right-6 z-10 max-w-lg">
                <AlertTitle>{(_isApiRunning.payload ? `API is running` : `API is unavailable` )} </AlertTitle>
                <AlertDescription className="opacity-60">
                    {(_isApiRunning.payload ? `The Api backend service is running` : `The Api backend service is not running` )}
                </AlertDescription>
            </Alert>
        </>)
    }



}

function Loading() {
    return <h2>🌀 Loading...</h2>;
}
  