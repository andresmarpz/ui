import Layout from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { darkTheme, globalStyles } from 'stitches.config';

function MyApp({ Component, pageProps }: AppProps) {
    globalStyles();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            value={{
                light: 'light',
                dark: darkTheme.className
            }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}

export default MyApp;
