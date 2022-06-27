import Box from '@/components/Box';
import LinkPreview from '@/components/LinkPreview';
import { NextPage } from 'next';

const Links: NextPage = () => {
    return (
        <Box
            css={{
                marginTop: '56px'
            }}>
            <h1>Link Preview</h1>
            <Box
                css={{
                    marginTop: 32,
                    color: '$gray11'
                }}>
                This component is inspired on{' '}
                <LinkPreview href="https://twitter.com/raunofreiberg">
                    @raunofreiberg
                </LinkPreview>
                's. Props to him for the idea & design.
            </Box>

            <Box
                css={{
                    marginTop: 32,
                    color: '$gray11'
                }}>
                Here are some more examples:
                <Box
                    css={{
                        marginTop: 48
                    }}>
                    <LinkPreview href="https://andresmarpz.com/">
                        andresmarpz.com
                    </LinkPreview>
                </Box>
                <Box
                    css={{
                        marginTop: 48
                    }}>
                    <LinkPreview href="https://apple.com/">
                        apple.com
                    </LinkPreview>
                </Box>
                <Box
                    css={{
                        marginTop: 48
                    }}>
                    <LinkPreview href="https://github.com/">
                        github.com
                    </LinkPreview>
                </Box>
            </Box>
        </Box>
    );
};

export default Links;
