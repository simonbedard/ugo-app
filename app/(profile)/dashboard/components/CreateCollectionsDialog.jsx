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
import { ImagePlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function CreateCollectionsDialog({}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='secondary'><ImagePlus className="mr-2 h-4 w-4" />Create collection</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create a collection.</DialogTitle>
                <DialogDescription>
                    Add multiple images from provides and share a single colletion with your team. 
                </DialogDescription>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" placeholder="Collection name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Input id="description" name='description' placeholder="Collection description" className="col-span-3" />
                </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create Collection</Button>
                </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        )
}