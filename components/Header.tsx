import Link from 'next/link';
import { useRouter } from 'next/router';
import { styled } from 'stitches.config';
import LeftArrow from './svgs/LeftArrow';

const StyledHeader = styled('header', {
    paddingY: 24
});
const StyledButton = styled('a', {
    padding: '8px 12px',
    backgroundColor: '$blue4',
    border: 'none',
    borderRadius: 4,

    transitionProperty: 'background-color, color',
    transition: '.1s ease-in-out',
    '&:hover': {
        backgroundColor: '$blue3'
    },
    '&:focus': {
        outline: '1px solid $blue7'
    }
});

const Header = () => {
    const router = useRouter();

    return (
        <StyledHeader>
            {router.pathname === '/' ? (
                ''
            ) : (
                <Link href="/">
                    <StyledButton>
                        <LeftArrow />
                    </StyledButton>
                </Link>
            )}
        </StyledHeader>
    );
};

export default Header;
