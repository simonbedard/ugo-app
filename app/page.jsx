/**
 * Import components
 */
import HeroText from '../components/Hero/HeroText';
import UgoImageGrid from '../components/Ugo/UgoImageGrid_V2';
import UgoTrendingSearch from '../components/Ugo/UgoTrendingSearch';

export const metadata = {
    title: 'Royalty free source, search engine that helps you find free images to use anywhere.',
    description: '...',
};

  
export default function Page() {
    return (
        <>
            <UgoTrendingSearch />
            <div className="container">
                <HeroText />
                <UgoImageGrid />
            </div>

        </>
    )
}