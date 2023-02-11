
 "use client"

import LinearProgress from '@mui/joy/LinearProgress';


export default function Loading() {
    return (
        <>
            <div className='loading-wrapper'>
                <LinearProgress thickness={1} />
                <div className="wrapper">
                    <p>Loading page for search query</p>
                </div>
            </div>
        </>
    )
}