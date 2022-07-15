import { styled } from '@/stitches.config';

const Paragraph = styled('div', {
    color: '$textPrimary',
    lineHeight: 1.5,

    variants: {
        size: {
            small: {
                fontSize: 14
            },
            normal: {
                fontSize: 16
            },
            large: {
                fontSize: 18
            }
        }
    },
    defaultVariants: {
        size: 'normal'
    }
});

export default Paragraph;
