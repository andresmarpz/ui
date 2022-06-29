import { getCssText } from '@/stitches.config';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props: any) {
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
                {/* <link
                    href="/static/favicons/favicon-32x32.png"
                    rel="icon"
                    sizes="32x32"
                    type="image/png"
                />
                <link
                    href="/static/favicons/favicon-16x16.png"
                    rel="icon"
                    sizes="16x16"
                    type="image/png"
                />
                <link
                    color="#4a9885"
                    href="/static/favicons/safari-pinned-tab.svg"
                    rel="mask-icon"
                /> */}
                <meta content="#ffffff" name="theme-color" />
            </Head>
            <body className="bg-white dark:bg-black text-white dark:text-black">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
