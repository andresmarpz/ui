import { useState } from 'react';
import Image from 'next/image';
import { styled } from '@/stitches.config';
import Box from './Box';

interface Image {
    src: string;
    width: number;
    height: number;
    base64: string;
}

const StyledImage = styled(Image, {
    transition: '400ms ease-in-out',
    transitionProperty: 'filter transform',
    variants: {
        blur: {
            true: {
                filter: 'blur(40px)'
            },
            false: {
                filter: 'blur(0px)'
            }
        }
    },
    defaultVariants: {
        blur: false
    }
});

const BlurImage = ({
    src,
    width,
    height,
    base64,
    shouldBlur,
    setDidBlur
}: Image & { shouldBlur: boolean; setDidBlur: (didBlur: boolean) => void }) => {
    const [loading, setLoading] = useState(true);

    return (
        <Box
            css={{
                width: width,
                height: height,
                borderRadius: 8,
                overflow: 'hidden'
            }}>
            <StyledImage
                src={src}
                width={width}
                height={height}
                placeholder="blur"
                blurDataURL={base64}
                priority={true}
                blur={shouldBlur && loading}
                onLoadingComplete={() => {
                    setLoading(false);
                    setDidBlur(true);
                }}
            />
        </Box>
    );
};

export default BlurImage;
