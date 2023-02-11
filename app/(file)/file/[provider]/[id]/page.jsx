import Link from 'next/link';
import Image from 'next/image';

import UgoImageGrid from '../../../../../components/Ugo/UgoImageaGrid';
import UgoImageUserProfile from './components/UgoImageUserProfile';
import UgoImageActions from './components/UgoImageActions';
import UgoImageInformations from './components/UgoImageInformations';
import Typography from '@mui/joy/Typography';

async function getImage(provider, id) {

    const res = await fetch(`http://localhost/api/search/file/${provider}/${id}`);
    
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        // throw new Error('Failed to fetch data');
    }

    return res.json();
}

  
export default async function Page({ params }) {

    const imageData = getImage(params.provider,params.id);
    // Wait for the promises to resolve
    const [image] = await Promise.all([imageData]).catch((error) => {
        console.log(error)
    });
    const imageRef = image.assets[0];
    return (
        <>
            <div className='wrapper'>

                
                <div className="row ugo-image-informations">
                    <UgoImageUserProfile provider={params.provider} />
                    <UgoImageActions />
                </div>
                

                <div className="image-wrapper">
                    <Image 
                        className='ugo-single-img'
                        src={imageRef.src.full} 
                        width={ imageRef.width / 2}
                        height={imageRef.height / 2}
                        alt={imageRef.description}
                    />
                </div>

                <UgoImageInformations 
                provider={params.provider}
                id={params.id} 
                imageRef={imageRef}
                />
  
                <div style={{display: 'none'}} className="image-information">
                    <h3>Statatistics</h3>
                    <ul>
                        <li>Views: {imageRef.views}</li>
                        <li>Downloads: {imageRef.downloads}</li>
                        <li>Likes: {imageRef.likes}</li>
                    </ul>
                    <h3>Date</h3>
                    <ul>
                        <li>Create at: {imageRef.date.created_at}</li>
                        <li>Update at: {imageRef.date.updated_at}</li>
                    </ul>
                    {/*
                    <h3>Exif data</h3>
                    <ul>
                        <li>Taille: {imageRef.exif.FileSize}</li>
                        <li>MimeType: {imageRef.exif.MimeType}</li>
                        <li>Model: {imageRef.exif.Model}</li>
                        <li>Software: {imageRef.exif.Software}</li>
                        <li>Size: {imageRef.width} x {imageRef.height}</li>
    </ul>*/}
                
                </div>

                <div  style={{marginTop: '60px'}}>
                    <UgoImageGrid />
                </div>
                
            </div>
    
        </>
    )
}
