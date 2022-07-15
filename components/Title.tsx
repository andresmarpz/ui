import { styled } from '@/stitches.config';
import { CSSProperties } from 'react';

interface Props {
    size?: 'xsmall' | 'small' | 'normal' | 'medium' | 'large'; // default: 'normal'
    css?: CSSProperties;
    children?: React.ReactNode;
}

const H5 = styled('h5', {});
const H4 = styled('h4', {});
const H3 = styled('h3', {});
const H2 = styled('h2', {});
const H1 = styled('h1', {});

const Title = ({ size = 'normal', css, children }: Props) => {
    switch (size) {
        case 'xsmall':
            return <H5 css={{ ...css }}>{children}</H5>;
        case 'small':
            return <H4 css={{ ...css }}>{children}</H4>;
        case 'normal':
            return <H3 css={{ ...css }}>{children}</H3>;
        case 'medium':
            return <H2 css={{ ...css }}>{children}</H2>;
        case 'large':
            return <H1 css={{ ...css }}>{children}</H1>;
    }
};

export default Title;
