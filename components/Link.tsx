import { styled } from '@/stitches.config';

const StyledLink = styled('a', {
    color: '$textHighlight',
    textDecoration: 'none',
    fontWeight: 500,
    lineHeight: 1,
    background:
        'linear-gradient(0deg, $gray12, $gray12) no-repeat right bottom / 0 1px',
    transition: 'background-size 350ms',
    paddindBottom: 2,
    '&:where(:hover, :focus-visible)': {
        backgroundSize: '100% 1px',
        backgroundPositionX: 'left'
    }
});

export default StyledLink;
