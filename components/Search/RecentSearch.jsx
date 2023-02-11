"use client"
import Typography from '@mui/joy/Typography';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
export default function RecentSearch({ list, recentSearchClick }) {

    return (
        <>
        <ul className="ugo-recent-search">
            <li className='head'>
                <Typography level="body1" component="p">Recent Search</Typography>
            </li>
            { list.map((item, key) =>
                <li key={key} className="term" onClick={() => recentSearchClick(item)}>
                    <div className="row">
                 
                        <Link className='term__head' href={`/search/${item}`}>
                            <HistoryIcon />
                            <Typography level="body2" component="p">{item}</Typography>
                        </Link>
          
                        <div className="term__close">
                            <CloseIcon/>
                        </div>
                    </div>
                 
                    
                </li>
            )}
        </ul>

        </>
    )
}