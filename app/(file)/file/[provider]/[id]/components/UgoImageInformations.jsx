
"use client"
import { Button } from "@mui/joy"
import Download from '@mui/icons-material/Download';
import CollectionsIcon from '@mui/icons-material/Collections';
import Typography from '@mui/joy/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function UgoImageInformations({ provider, id, imageRef }) {


    return (
        <>
            <div className="row">
                <div>
                    <Typography level="body3" component="p">{ id }</Typography>
                    <Typography level="body3" component="p">{imageRef.description }</Typography>
                    <Typography level="body3" component="p">----</Typography>
                    <Typography level="body3" component="p">Free to use under the { provider } License</Typography>
                </div>
                <div>
                    <Button component="a" target="_blank" href={imageRef.links.html} sx={{margin: "0 10px" }} variant="outlined" startDecorator={<VisibilityIcon />}>View on {provider}</Button>
                </div>
            </div>
        </>
    )
}
