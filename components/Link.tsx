import React from 'react';
import { styled } from 'stitches.config';
import ArrowRight from './svgs/ArrowRight';

const StyledContainer = styled('div', {
    border: '1px solid black',
    padding: '4px'
});

const StyledLink = styled('a', {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 500
});

export default StyledLink;
