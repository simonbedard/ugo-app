"use client"
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'next/navigation';
import { Button } from 'components/ui/button';
import { ImagePlus } from "lucide-react"
import CreateCollectionsDialog from './components/CreateCollectionsDialog';
import { useEffect } from 'react';
/**
 * Import components
 */

export default function Page() {
    const isUserAuth = useSelector((state) => state.auth.isAuth);
    const userProfile = useSelector((state) => state.auth.profile);
 
    useEffect(() => {
        if(!isUserAuth){
            redirect('/auth/login');
        }
    }, [])


    return (
        <>    
            <div className="container  py-10">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Dashboard</h1>
                <div className="my-10">
                    <p>Name: { userProfile.name }</p>
                    <p>Email: { userProfile.email }</p>
                    <p>Email verified:  { userProfile.email_verified_at }</p>
                    <p>Warning:  { userProfile.warnings }</p>
                    <p>Notes:  { userProfile.notes }</p>
                </div>

                <div className="collection border-t">          
                    <div className="text-center my-10">
                        <h2 className="my-5 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                            Your collections
                        </h2> 
                        <p className='my-4 text-xl'>Look's like you dont have any collections. Create one and share it to your team</p>
                        <CreateCollectionsDialog />
                    </div>
                </div> 
                <div className="collection border-t">          
                    <div className="text-center my-10">
                        <h2 className="my-5 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                            Full search history
                        </h2> 
                        <table className="w-full my-10 text-sm">
                            <tbody>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="text-muted-foreground border px-4 py-1 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                Nature
                                </td>
                                <td className="border px-4 py-1 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                2023-05-19T15:03:06.000000Z
                                </td>
                                <td className="border px-4 py-1 text-center [&[align=center]]:text-center [&[align=right]]:text-right">
                                    <Button variant='outline'>View</Button>
                                </td>
                            </tr>
                            <tr className="m-0 border-t p-0 even:bg-muted">
                                <td className="text-muted-foreground border px-4 py-1 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                Food pizza
                                </td>
                                <td className="border px-4 py-1 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                2023-05-19T15:03:06.000000Z
                                </td>
                                <td className="border px-4 py-1 text-center [&[align=center]]:text-center [&[align=right]]:text-right">
                                    <Button variant='outline'>View</Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div> 

    

        </div>
        </>
    )
}