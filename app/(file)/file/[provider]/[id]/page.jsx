import Image from 'next/image';
import UgoImageUserProfile from './components/UgoImageUserProfile';
import UgoImageActions from './components/UgoImageActions';
import UgoImageInformations from './components/UgoImageInformations';
import FakeData from "@/test/image.json"
import UgoImageGrid from '@/components/Ugo/UgoImageGrid_V2';
import { cookies } from 'next/headers';
import PageContent from './components/PageContent';
import { titleCase } from 'utils/utils';


export async function generateMetadata({ params }, parent) {
    return {
      title: `${titleCase(params.provider)} - #${params.id}`
    }
}

async function getImage(provider, id) {
    // const res = await fetchApi(`http://localhost/api/search/file/${provider}/${id}`);
    const res = await fetch(`http://localhost/api/search/file/${provider}/${id}`);
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch asset');
        return FakeData;
    }else{
        return res.json();
    }
}

export default async function Page({ params}) {
    // Validate if the API status is good
    if(cookies().get('api-status') == true){
        const imageData = await getImage(params.provider,params.id);
        // Wait for the promises to resolve
        const [image] = await Promise.all([imageData]).catch((error) => {});
        const imageRef = image.assets;
        return (
            <>
            
                <div className='container'> 
                    <div className="flex gap-10 my-20">
                        <div className='basis-6/12'>
                            <Image 
                                src={imageRef.src.regular} 
                                width={ imageRef.width / 2}
                                height={imageRef.height / 2}
                                alt={imageRef.description || "No alt provided"}
                                className='ugo-single-img'
                            />
                        </div>
    
    
                        <div className="informations border-t py-10 basis-6/12">
                            <h1 className='text-xl font-extrabold'>{imageRef.id}</h1>
                            <p className='text-sm text-muted-foreground'>{imageRef.description}</p>
                            <UgoImageActions />
                            <UgoImageUserProfile data={imageRef} />
                            <UgoImageInformations 
                                provider={params.provider}
                                id={params.id} 
                                imageRef={imageRef}
                            />
                        </div>
                    </div>
                    <UgoImageGrid />
                </div>
        
            </>
        )
    }else{
        return (
            <PageContent />
        )
    }
  
   
}
