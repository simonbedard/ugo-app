"use client"
import Link from 'next/link';

export default function Footer() {
    return (
        <>
            <footer className='py-4 border-t'>
                <div className="container flex items-center gap-4 justify-between text-sm">
                    <div>
                        <p className='text-muted-foreground' >Copyright © Ugo®. All rights reserved.</p>
                    </div>
                    <div className='flex gap-4'>
                        <Link
                            href="/terms"
                            className="text-muted-foreground underline hover:text-primary"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-muted-foreground underline hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        <p className='text-muted-foreground'>Version Alpha.v1.0.040223</p>
                    </div>
                </div>
            </footer>
        </>
    )
}