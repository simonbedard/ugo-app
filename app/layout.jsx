"use client"
import { Roboto } from '@next/font/google';
import { Provider } from 'react-redux';
import { store } from "../store";
import Header from '../components/header/Header_V2';
import Footer from '../components/Footer/Footer_V2';
import HealthCheck from '../components/Test/HealthCheck';
import "../styles/styles.scss";


const roboto = Roboto({
  weight: ['100', '300', '500', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'optional',
});



export default function RootLayout({ children }){

    return (
      
      <html lang="en" >
        <Provider store={store}>
              <body>
                <HealthCheck />
                <Header />
                {children}
                <Footer />
              </body>
        </Provider>
      </html>
    );
}
