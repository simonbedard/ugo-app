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
import { Plus } from "lucide-react";
import CreateCollectionsDialog from "app/(profile)/dashboard/components/CreateCollectionsDialog";
export default function AddToCollectionsDialog({}) {
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
                    <p className="mb-2">No collection found, start by creating one!</p>
                    <CreateCollectionsDialog />
                </div>
                <DialogFooter>
                    
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        )
}