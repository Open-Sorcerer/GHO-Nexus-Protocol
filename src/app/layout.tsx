import './globals.css'
import ClientLayout from './Web3Provider'
import {FC, PropsWithChildren} from 'react'
import Navbar from "@components/Layout/Navbar";

const RootLayout: FC<PropsWithChildren<{}>> = ({children}) => {
    return (
        <html lang="en">
        <body>
        <ClientLayout>
            <Navbar/>
            {children}
        </ClientLayout>
        </body>
        </html>
    )
}

export default RootLayout
