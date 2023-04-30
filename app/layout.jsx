"use client"
import { Roboto } from '@next/font/google';
import { Provider } from 'react-redux';
import { store } from "../store";
import Header from '../components/header/Header';
import Footer from '../components/Footer/Footer';
import HealthCheck from '../components/Test/HealthCheck';
import "../styles/styles.scss";

/**
 * Import Material UI
 */
import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider, extendTheme, getInitColorSchemeScript } from '@mui/joy/styles';

const ugo = extendTheme({
  typography: {
      h1: {
          fontSize: 35,
      }
  },
  components: { },
});
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
            

            <CssVarsProvider defaultMode="dark" theme={ugo}>
            {/* must be used under CssVarsProvider */}
            <CssBaseline />
              <body>
                <HealthCheck />
                {getInitColorSchemeScript()}
                <Header />
                {children}
                <Footer />
              </body>
            </CssVarsProvider>
        </Provider>
      </html>
    );
}
