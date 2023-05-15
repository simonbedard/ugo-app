
"use client"
import { Button } from "@/components/ui/button"
import { Plus, Download, } from "lucide-react"

export default function UgoImageActions({ provider }) {
    return (
        <>
            <div className="flex gap-4 my-10">
                <Button variant="secondary"><Plus className="mr-2 h-4 w-4"  />Add to collection</Button>
                <Button><Download className="mr-2 h-4 w-4" />Download for free</Button>
            </div>
        </>
    )
}
