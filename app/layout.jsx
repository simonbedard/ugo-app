import "../styles/styles.scss";
import UgoProvider from '@/components/UgoProvider';

export default function RootLayout({ children }){

    return (
      <html lang="en" className='dark' >
          <UgoProvider children={ children } />
      </html>
    );
}
