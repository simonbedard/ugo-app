import UgoImageGrid from "@/components/Ugo/UgoImageGrid_V2"


export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const query = params.query

    return {
      title: `750+ ${query} images - Download royalties free photos`,
      description: "description",
    }
  }
   

export default async function Page({ params }) {
    return (
        <>
        <div className='wrapper'>
            <UgoImageGrid />
        </div>
        </>
    )
}