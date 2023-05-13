"use client"
import Link from 'next/link';

export default function Footer() {
    return (
        <>
            <footer className='container flex items-center py-4 border-t'>
                <p>Copyright © Ugo®. All rights reserved.</p>
                <Link href="https://github.com/simonbedard" target={'_blank'}>
                    GitHub
                </Link>Version Alpha.v1.0.040223
            </footer>
        </>
    )
}