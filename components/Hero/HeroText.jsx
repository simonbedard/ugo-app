"use client"
import { Badge } from "@/components/ui/badge"
import { Image } from "lucide-react"

export default function HeroText() {
    return (
        <>  
            <div className="hero hero--text  text-center py-20">
                <div className="version">
                    <Badge>Alpha.v1.0.2</Badge>
                </div>
                
                <h1 className="text-7xl font-bold block my-20"><span className="text-transparent bg-clip-text bg-gradient-to-t from-blue-600 to-blue-900">Meet Ugo</span><br />An Open Source, search engine that helps you find free images to use anywhere.</h1>
                <ul className="providers inline-flex gap-4">
                    {[
                        'Unsplash',
                        'Pexel',
                        'Pixabay',
                        'Deposite',
                        'more...',
                    ].map((item, index) => (
                        <li key={index}><Badge variant="secondary">{item}</Badge></li>
                    ))}
                </ul>
            </div>
        </>
    )
}