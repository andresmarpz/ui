import Layout from '@/components/Layout';
import { darkTheme, globalCss, theme } from '@/stitches.config';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';

const globalStyles = globalCss({
    '*': {
        boxSizing: 'border-box'
    },
    'html, body': {
        backgroundColor: theme.colors.background,
        padding: 0,
        margin: 0,
        fontFamily: `-apple-system, Inter, BlinkMacSystemFont, "Helvetica Neue", sans-serif`
    }
});

function MyApp({ Component, pageProps }: AppProps) {
    globalStyles();

    return (
        <ThemeProvider
            disableTransitionOnChange
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
