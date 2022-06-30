import { getCssText } from '@/stitches.config';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <style
                    id="stitches"
                    dangerouslySetInnerHTML={{ __html: getCssText() }}
                />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="preload"
                    href="/assets/fonts/inter-var-latin.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <meta content="#ffffff" name="theme-color" />
            </Head>
            <body className="bg-white dark:bg-black text-white dark:text-black">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
