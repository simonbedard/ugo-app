"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import { Button } from 'components/ui/button';
import { Import, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import CreateCollectionsDialog from "app/(profile)/dashboard/components/CreateCollectionsDialog";
import Link from "next/link";
export default function AddToCollectionsDialog({}) {
    const isUserAuth = useSelector((state) => state.auth.isAuth);


    function CreateCollectionAuth(){
        if(isUserAuth){
           return <>
                <p className="mb-2">No collection found, start by creating one!</p>
                <CreateCollectionsDialog />
           </>;

        }else{
            return  <>
             <p className="mb-2 ">Your must be login to add images to collection!</p>
             <Button variant="outline" asChild>
                <Link href='/auth/login'>Sign In</Link>
            </Button>
            </>
        }   
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='secondary'><Plus className="mr-2 h-4 w-4" />Add to collection</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Add to collection</DialogTitle>
                <DialogDescription>
                    Add the images to one of yout collection.
                </DialogDescription>
                <div className="py-10 text-center">
                
                    <CreateCollectionAuth />
                    
                </div>
                <DialogFooter>
                    
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        )
}