import Layout from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { darkTheme, globalCss, theme } from 'stitches.config';

const globalStyles = globalCss({
    '*': {
        boxSizing: 'border-box'
    },
    'html, body': {
        backgroundColor: theme.colors.background,
        padding: 0,
        margin: 0,
        fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto,
		 Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", sans-serif`
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
