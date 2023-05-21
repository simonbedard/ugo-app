'use client'
import { Provider } from 'react-redux';
import { store } from "../store";
import Header from '@/components/header/Header_V2';
import Footer from '@/components/Footer/Footer_V2';
import HealthCheck from '@/components/Test/HealthCheck';
import { Toaster } from "@/components/ui/toaster"

export default function UgoProvider({ children }) {
    return (
        <Provider store={store}>
              <body>
                <HealthCheck />
                <div className='relative flex min-h-screen flex-col'>
                  <Header />
                  {children}
                  <Footer />
                </div>
                <Toaster/>
              </body>
        </Provider>
    )
}
