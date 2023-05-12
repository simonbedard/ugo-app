
"use client"
import Link from 'next/link';

export default function UgoImageUserProfile({ provider }) {


    return (
        <>
            <div className="profile">
                <div className="profile__content">
                    <h4>Simon Bédard</h4>
                    <p>View profile on <Link href="https://unsplash.com/fr" target="_blank">{ provider }</Link></p>
                </div>
            </div>
        </>
    )
}
