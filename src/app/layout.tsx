import './globals.css'
import ClientLayout from './Web3Provider'
import {FC, PropsWithChildren} from 'react'
import Navbar from "@components/Layout/Navbar";
import Spliner from "@components/Spliner";

const RootLayout: FC<PropsWithChildren<{}>> = ({children}) => {
    return (
        <html lang="en">
        <body>
        <div id="w-full h-full relative">
            <ClientLayout>
                <Navbar/>
                <Spliner/>
                <div className="w-full h-full z-0 flex justify-center items-center fixed px-20">
                    {children}
                </div>
            </ClientLayout>
        </div>
        </body>
        </html>
    )
}

export default RootLayout
