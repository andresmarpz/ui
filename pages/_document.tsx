import { getCssText } from '@/stitches.config';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="preload"
                    href="/assets/fonts/inter-var-latin.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
							@font-face {
								font-family: 'Inter';
								font-style: 'normal';
								font-display: 'optional';
								src: url("/assets/fonts/inter-var-latin.woff2") format("woff2");
							}
						`
                    }}
                />
                <style
                    id="stitches"
                    dangerouslySetInnerHTML={{ __html: getCssText() }}
                />
                <link rel="icon" href="/favicon.ico" />
                <meta content="#ffffff" name="theme-color" />
            </Head>
            <body className="">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
