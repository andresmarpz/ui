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
                <LinkPreview
                    image="/assets/previews/rauno.png"
                    href="https://twitter.com/raunofreiberg">
                    @raunofreiberg
                </LinkPreview>
                's. Props to him for the idea & design.
            </Box>
        </Box>
    );
};

export default Links;
