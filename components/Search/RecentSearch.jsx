"use client"
import Link from 'next/link';
import { History } from 'lucide-react';
export default function RecentSearch({ list, recentSearchClick }) {
    return (
        <>
        <ul className="ugo-recent-search rounded-b-lg border bg-background p-6">
            { list.map((item, key) =>
                <li key={key} className="term py-2" onClick={() => recentSearchClick(item)}>
                    <div className="row">
                        <Link className='term__head' href={`/search/${item}`}>
                            <p className='text-sm text-muted-foreground'>{item}</p>
                        </Link>
                        <div className="term__close">
                            <History className='h-4 w-4'/>
                        </div>
                    </div>
                </li>
            )}
        </ul>

        </>
    )
}