import LinkPreview from '@/components/LinkPreview';
import Paragraph from '@/components/Paragraph';
import Title from '@/components/Title';
import { NextPage } from 'next';
import { styled } from 'stitches.config';
import { getPlaiceholder } from 'plaiceholder';
import path from 'path';
import { promises as fs } from 'fs';
import React from 'react';

const Item = styled('li', {
    marginTop: 24
});

const Span = styled('span', {
    color: '$gray12',
    fontStyle: 'italic'
});

const StyledHr = styled('hr', {
    border: 0,
    borderTop: '1px solid $gray5',
    maxWidth: '20%',
    margin: 'auto'
});

export async function getStaticProps(context: any) {
    const base64images: any[] = [];
    const previewsDirectory = path.join(
        process.cwd(),
        '/public/assets/previews'
    );
    const filenames = await fs.readdir(previewsDirectory);
    const previews = filenames.map(async (filename) => {
        const { base64, img } = await getPlaiceholder(
            '/assets/previews/' + filename
        );
        base64images.push({
            href: filename
                .replaceAll('!', '/')
                .substring(0, filename.length - 4),
            base64,
            ...img
        });
    });
    await Promise.all(previews);
    console.log(base64images);

    return {
        props: {
            base64images
        }
    };
}

interface Props {
    base64images: any[];
}

const Links: NextPage<Props> = ({ base64images }: Props) => {
    const [images, setImages] = React.useState(base64images);
    const getData = (href: string) => {
        const url = href
            .substring(href.indexOf('/') + 2, href.length)
            .replaceAll('!', '/');

        const image = images.find((image) => image.href === url);
        return image;
    };

    return (
        <>
            <Title size="large" css={{ marginTop: 40 }}>
                Link Preview
            </Title>
            <Paragraph
                css={{
                    fontStyle: 'italic'
                }}>
                Provide a visual preview of the link on hover.
            </Paragraph>
            <StyledHr css={{ marginTop: 48 }} />

            <Paragraph css={{ marginTop: 48 }}>
                This component is inspired on{' '}
                <LinkPreview
                    href="https://twitter.com/raunofreiberg/"
                    object={getData('https://twitter.com/raunofreiberg')}>
                    @raunofreiberg
                </LinkPreview>
                's. Props to him for the idea & design.
            </Paragraph>

            <Title css={{ marginTop: 48 }}>Build</Title>
            <Paragraph
                css={{
                    color: '$gray11'
                }}>
                In this case, it is{' '}
                {/* <LinkPreview href="https://radix-ui.com">Radix UI</LinkPreview>{' '} */}
                under the hood. They provide a set of unstyled and accessible
                primitives which are amazing building blocks for a great user
                experience.
            </Paragraph>
            <Paragraph
                css={{
                    marginTop: 32
                }}>
                When I was thinking about the images, there were two possible
                approaches:
                <ul>
                    <Item
                        css={{
                            marginTop: 8
                        }}>
                        <Span>Static Images</Span>: I went for this option since
                        it is fairly simple to serve static files with Next.js.
                        Hyperlinks are gathered from every page at build time
                        and previews are generated and served as assets. The
                        upside is that these images can also be cached easily
                        and provide a great user experience.
                    </Item>
                    <Item>
                        <Span>Fetching On Load</Span>: I considered this method,
                        but relying on an external API each time to generate
                        previews did not sound very good.
                    </Item>
                </ul>
            </Paragraph>

            <Paragraph
                css={{
                    marginTop: 32
                }}>
                Here are some other examples:
                {/* <ul>
                    <Item>
                        <LinkPreview href="https://andresmarpz.com">
                            andresmarpz.com
                        </LinkPreview>
                    </Item>
                    <Item>
                        <LinkPreview href="https://apple.com">
                            apple.com
                        </LinkPreview>
                    </Item>
                    <Item>
                        <LinkPreview href="https://github.com">
                            github.com
                        </LinkPreview>
                    </Item>
                </ul> */}
            </Paragraph>
        </>
    );
};

export default Links;
