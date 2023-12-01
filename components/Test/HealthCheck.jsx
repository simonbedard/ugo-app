'use client'
import { useSelector, useDispatch } from 'react-redux';
import { setApiRunning } from "../../slices/globalSlice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function HealthCheck({ status }) {
    const dispatch = useDispatch();
    dispatch(setApiRunning(status))
    return <CheckApi  status={status}/>
}

function CheckApi({ status }){
    return (<>
        <Alert
        className="fixed bottom-6 left-6 z-10 max-w-lg">
            <AlertTitle>{(status ? `API is running` : `API is unavailable` )} </AlertTitle>
            <AlertDescription className="opacity-60">
                {( status ? `The Api backend service is running` : `The Api backend service is not running` )}
            </AlertDescription>
        </Alert>
    </>);
}

function Loading() {
    return <h2>🌀 Loading...</h2>;
}
  