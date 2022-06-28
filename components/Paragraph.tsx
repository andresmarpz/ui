import { styled } from '@stitches/react';

const Paragraph = styled('div', {
    color: '$gray11',

    variants: {
        size: {
            small: {
                lineHeight: '1.5',
                fontSize: 14
            },
            normal: {
                lineHeight: 1.5,
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
