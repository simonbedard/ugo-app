"use client"
import { useState, useEffect } from 'react';

async function getImage(provider, id ) {
  const res = await fetch(`http://localhost/api/search/file/${provider}/${id}`);
  return res.json();
}

export default function UgoImage({ provider, id }) {
  const [imageRef, setImageRef] = useState({});

  getImage(provider, id).then((data) => {
    setImageRef(data);
  });
  

    return (
        <>
            <p>{imageRef.description}</p>
        </>
    )
}
