
"use client"
import Avatar from '@mui/joy/Avatar';
import Link from 'next/link';

export default function UgoImageUserProfile({ provider }) {


    return (
        <>
            <div className="profile">
                <Avatar color="primary" size="lg">SB</Avatar>
                <div className="profile__content">
                    <h4>Simon Bédard</h4>
                    <p>View profile on <Link href="https://unsplash.com/fr" target="_blank">{ provider }</Link></p>
                </div>
            </div>
        </>
    )
}
