
import UgoImageGrid from "../../../../components/Ugo/UgoImageaGrid"

export default async function Page({ params }) {
    console.log(params)
    return (
        <>

        <div className='wrapper'>
            <h1>{ params.query }</h1>
            <UgoImageGrid />
        </div>
        </>
    )
}