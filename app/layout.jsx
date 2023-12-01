import "../styles/styles.scss";

import UgoProvider from '@/components/UgoProvider';
import { cookies } from 'next/headers'

export default function RootLayout({ children }){
  const cookieStore = cookies();
  // Cookie can only be a string. We convert the value to a boolean
  const ApiStatus = (cookieStore.get('api-status').value == "true" ? true : false);

    return (
      <html lang="en" className='dark' >
          <UgoProvider children={children} apiStatus={ApiStatus}/>
      </html>
    );
}
