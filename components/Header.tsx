import { useEffectOnce } from '@/hooks/useEffectOnce';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { styled } from 'stitches.config';
import Box from './Box';
import LeftArrow from './svgs/LeftArrow';
import Moon from './svgs/Moon';
import Sun from './svgs/Sun';
import Image from 'next/image';
const StyledHeader = styled('header', {
    paddingY: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});
const StyledBack = styled('a', {
    padding: '8px 12px',
    backgroundColor: '$elementBackground',
    border: 'none',
    borderRadius: 4,

    transitionProperty: 'background-color, color',
    transition: '.1s ease-in-out',
    '&:hover': {
        backgroundColor: '$hoverElementBackground'
    },
    '&:focus': {
        outline: '1px solid $activeElementBackground'
    }
});

const StyledToggle = styled('button', {
    border: '1px solid $gray4',
    padding: '8px 12px',
    borderRadius: 4,
    backgroundColor: '$gray3'
});

const ToggleTheme = ({
    theme,
    toggleTheme
}: {
    theme: string | undefined;
    toggleTheme: () => void;
}) => {
    /*
		Since Stitches server-renders css, we can't know the system
		preferred theme until the component is mounted.
	*/
    const [mounted, setMounted] = useState(false);
    useEffectOnce(() => setMounted(true));

    return (
        <StyledToggle onClick={toggleTheme}>
            {mounted ? (
                theme === 'dark' ? (
                    <Sun />
                ) : (
                    <Moon />
                )
            ) : (
                <Image
                    alt=""
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    width={15}
                    height={15}
                />
            )}
        </StyledToggle>
    );
};

const Header = () => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <StyledHeader>
            <Box>
                {router.pathname === '/' ? (
                    ''
                ) : (
                    <Link href="/">
                        <StyledBack>
                            <LeftArrow />
                        </StyledBack>
                    </Link>
                )}
            </Box>
            <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
        </StyledHeader>
    );
};

export default Header;
