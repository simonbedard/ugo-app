"use client"
import { useState, useEffect } from 'react';
import { Button } from 'components/ui/button';
import Link from 'next/link';
export default function PageContent({ provider, id }) {


    return (
        <div className='container min-h-screen'>
            <div className='text-center m-20'>
                <h2 className='text-2xl w-full'>Cannot fetch the assets because the API is currenlty down.</h2>
                <div className='flex gap-2 mt-5 justify-center'>
                    <Button asChild>
                        <Link href='/'>Back to homepage</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href='/status'>Check status page</Link>
                    </Button>
                </div>
            </div> 

        </div>
    )
}
