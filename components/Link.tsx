import { styled } from 'stitches.config';

const StyledLink = styled('a', {
    color: 'black',
    textDecoration: 'none',
    lineHeight: 1,
    fontWeight: 500,
    background:
        'linear-gradient(0deg, $gray12, $gray12) no-repeat right bottom / 0 2px',
    transition: 'background-size 350ms',
    paddindBottom: 2,
    '&:where(:hover, :focus-visible)': {
        backgroundSize: '100% 2px',
        backgroundPositionX: 'left'
    }
});

export default StyledLink;
