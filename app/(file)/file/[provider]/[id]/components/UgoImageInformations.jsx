
"use client"

export default function UgoImageInformations({ provider, id, imageRef }) {


    return (
        <>
            <div className="row">
                <div>
                    <p>{ id }</p>
                    <p>{imageRef.description }</p>
                    <p>----</p>
                    <p>Free to use under the { provider } License</p>
                </div>
                <div>
                    <Link to={imageRef.links.html}>View on {provider}</Link>
                </div>
            </div>
        </>
    )
}
