import Box from '@/components/Box';
import Browser from '@/components/Browser';
import LinkPreview from '@/components/LinkPreview';
import Paragraph from '@/components/Paragraph';
import Title from '@/components/Title';
import { getLinkPreviews, ImageData } from '@/lib/scanner';
import { styled } from '@/stitches.config';
import { NextPage } from 'next';
import Head from 'next/head';

const Item = styled('li', {
    marginTop: 24
});

const Span = styled('span', {
    color: '$textHighlight',
    fontStyle: 'italic'
});

const Separator = styled('hr', {
    border: 0,
    borderTop: '1px solid $gray5',
    maxWidth: '20%',
    margin: '48px auto'
});

export async function getStaticProps() {
    const previews = getLinkPreviews();
    return {
        props: { previews }
    };
}

interface Props {
    previews: ImageData[];
}

const Links: NextPage<Props> = ({ previews }: Props) => {
    const getData = (href: string) => {
        return previews.find((image) => image.href === href);
    };

    return (
        <>
            <Head>
                <title>Link Preview</title>
            </Head>
            <main>
                <Title size="large" css={{ marginTop: 40 }}>
                    Link Preview
                </Title>
                <Paragraph
                    css={{
                        fontStyle: 'italic',
                        marginBottom: 40
                    }}>
                    Provide a visual preview of the link on hover.
                </Paragraph>
                <Browser center>
                    <Box
                        css={{
                            backgroundColor: '$gray1',
                            padding: 12,
                            borderRadius: 5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 'auto'
                        }}>
                        <LinkPreview
                            href="https://nextjs.org/"
                            imageData={getData('https://nextjs.org/')}>
                            Next.js
                        </LinkPreview>
                    </Box>
                </Browser>
                <Separator />

                <Paragraph css={{ marginTop: 48 }}>
                    This component is inspired on{' '}
                    <LinkPreview
                        href="https://twitter.com/raunofreiberg/"
                        imageData={getData(
                            'https://twitter.com/raunofreiberg/'
                        )}>
                        raunofreiberg
                    </LinkPreview>
                    &apos;s. Props to him for the idea & design.
                </Paragraph>

                <Title size="medium" css={{ marginTop: 48 }}>
                    Build
                </Title>
                <Paragraph>
                    In this case, it is{' '}
                    <LinkPreview
                        href="https://radix-ui.com/"
                        imageData={getData('https://radix-ui.com/')}>
                        Radix UI
                    </LinkPreview>{' '}
                    under the hood. They provide a set of unstyled and
                    accessible primitives which are amazing building blocks for
                    a great user experience.
                </Paragraph>
                <Paragraph
                    css={{
                        marginTop: 32
                    }}>
                    During the thought process I considered two approaches:
                    <ul>
                        <Item
                            css={{
                                marginTop: 8
                            }}>
                            <Span>Static Images</Span>: Previews are generated
                            at build time and served as assets. Using Next.js
                            getStaticProps we can scan all available previews
                            and pass all the data needed to render the images on
                            each link through props.
                        </Item>
                        <Item>
                            <Span>Fetching On Load</Span>: I thought about
                            dynamically generating previews through an API on
                            page load and keeping them in state. I ended up
                            discarding this option since most APIs have a
                            limited rate per month, and having my own also means
                            I can just go for the static approach.
                        </Item>
                    </ul>
                </Paragraph>
                <Paragraph
                    css={{
                        marginTop: 32
                    }}>
                    I also wanted to take advantage of the next/image component
                    to show a blur placeholder of each image.
                    <br />
                    <br />
                    There are a few ways to do this: use Next.js static imports
                    which automatically generates the placeholder, or generate
                    them using tools such as{' '}
                    <LinkPreview
                        href="https://plaiceholder.co/"
                        imageData={getData('https://plaiceholder.co/')}>
                        plaiceholder.co
                    </LinkPreview>
                    .
                    <br />
                    <br />I decided to generate base64 images on getStaticProps
                    to minimize hardcoding. This way, it&apos;s possible to
                    automatically build an object with all the data needed and
                    pass it through page props.
                </Paragraph>

                <Paragraph
                    css={{
                        marginTop: 32,
                        marginBottom: 72
                    }}>
                    Here are some other examples:
                    <ul>
                        <Item>
                            <LinkPreview
                                href="https://andresmarpz.com/"
                                imageData={getData('https://andresmarpz.com/')}>
                                andresmarpz.com
                            </LinkPreview>
                        </Item>
                        <Item>
                            <LinkPreview
                                href="https://apple.com/"
                                imageData={getData('https://apple.com/')}>
                                apple.com
                            </LinkPreview>
                        </Item>
                        <Item>
                            <LinkPreview
                                href="https://github.com/"
                                imageData={getData('https://github.com/')}>
                                github.com
                            </LinkPreview>
                        </Item>
                    </ul>
                </Paragraph>
            </main>
        </>
    );
};

export default Links;
