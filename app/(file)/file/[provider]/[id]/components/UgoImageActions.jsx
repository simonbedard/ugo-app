
"use client"
import { Button } from "@mui/joy"
import Download from '@mui/icons-material/Download';
import CollectionsIcon from '@mui/icons-material/Collections';

export default function UgoImageActions({ provider }) {


    return (
        <>
            <div className="actions">
                <Button sx={{margin: "0 10px" }} variant="outlined"  startDecorator={<CollectionsIcon />}>Add to collection</Button>
                <Button sx={{margin: "0 10px" }} startDecorator={<Download />}>Download for free</Button>
            </div>
        </>
    )
}
