import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import '../styles/global.css'

export default function App({ 
    Component, 
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </SessionProvider>
    );
}