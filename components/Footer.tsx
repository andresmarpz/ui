import { styled } from 'stitches.config';

const StyledFooter = styled('footer', {
    padding: 12,
    color: '$textPrimary'
});

const StyledSpan = styled('span', {
    color: '$textHighlight'
});

const Footer = () => {
    return (
        <StyledFooter>
            Deployed at <StyledSpan>▲</StyledSpan>
            Vercel
        </StyledFooter>
    );
};

export default Footer;
