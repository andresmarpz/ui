import Image from 'next/image';
import { styled } from 'stitches.config';

const StyledFooter = styled('footer', {
    padding: 12
});

const Footer = () => {
    return (
        <StyledFooter>
            <Image
                src="/assets/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
            />
        </StyledFooter>
    );
};

export default Footer;
