
"use client"
import { Button } from "@/components/ui/button"
import { Download, } from "lucide-react"
import AddToCollectionsDialog from "@/components/Ugo/AddToCollectionsDialog"
export default function UgoImageActions({ provider }) {
    return (
        <>
            <div className="flex gap-4 my-10">
                <Button><Download className="mr-2 h-4 w-4" />Download for free</Button>
                <AddToCollectionsDialog />
            </div>
        </>
    )
}
