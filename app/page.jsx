"use client"


/**
 * Import components
 */

import HeroText from '../components/Hero/HeroText';
import UgoImageGrid from '../components/Ugo/UgoImageaGrid';
import UgoTrendingSearch from '../components/Ugo/UgoTrendingSearch';

export default function Page() {
    return (
        <>
            <UgoTrendingSearch />
            <HeroText />
            <UgoImageGrid />
        </>
    )
}