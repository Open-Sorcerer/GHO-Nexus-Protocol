import './globals.css'
import ClientLayout from './Web3Provider'
import {FC, PropsWithChildren} from 'react'
import Navbar from "@components/Layout/Navbar";
import Spliner from "@components/Spliner";

const RootLayout: FC<PropsWithChildren<{}>> = ({children}) => {
    return (
        <html lang="en">
        <body>
        <ClientLayout>
            <div className="w-full h-full relative bg-fixed flex-1 justify-center text-black">
                <Navbar/>
                <Spliner/>
                {children}
            </div>
        </ClientLayout>
        </body>
        </html>
    )
}

export default RootLayout
