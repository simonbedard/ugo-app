"use client"
import Link from 'next/link';
export default function RecentSearch({ list, recentSearchClick }) {
    return (
        <>
        <ul className="ugo-recent-search">
            <li className='head'>
                <p>Recent Search</p>
            </li>
            { list.map((item, key) =>
                <li key={key} className="term" onClick={() => recentSearchClick(item)}>
                    <div className="row">
                        <Link className='term__head' href={`/search/${item}`}>
                            <p>{item}</p>
                        </Link>
                        <div className="term__close">
                            X
                        </div>
                    </div>
                </li>
            )}
        </ul>

        </>
    )
}