import Box from '@/components/Box';
import Moon from '@/components/svgs/Moon';
import Sun from '@/components/svgs/Sun';
import { useEffectOnce } from '@/hooks/useEffectOnce';
import { css, styled } from '@/stitches.config';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LeftArrow from './svgs/LeftArrow';

const StyledHeader = styled('header', {
    paddingY: 24,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const StyledBack = css({
    color: '$textHighlight',
    textDecoration: 'none',

    padding: '8px 12px',
    border: 'none',
    backgroundColor: '$elementBackground',
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

const ToggleTheme = ({ toggleTheme }: { toggleTheme: () => void }) => {
    /*
		Since Stitches server-renders css, we can't know the system
		preferred theme until the component is mounted.
	*/
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    useEffectOnce(() => setMounted(true));

    return (
        <StyledToggle
            aria-label={`Toggle page theme between dark and light.`}
            onClick={toggleTheme}>
            {mounted ? (
                resolvedTheme === 'dark' ? (
                    <Sun />
                ) : (
                    <Moon />
                )
            ) : (
                <Image
                    alt="Placeholder for theme toggle button."
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
                    <NextLink href={'/'}>
                        {/* 
							Since next/link expects an anchor tag element, we can't
							use Stitches styled() element. Therefore we need to use css()
							and call the function to retrieve the classname. 
						*/}
                        <a
                            aria-label="Go back to homepage"
                            className={StyledBack()}>
                            <LeftArrow />
                        </a>
                    </NextLink>
                )}
            </Box>
            <ToggleTheme toggleTheme={toggleTheme} />
        </StyledHeader>
    );
};

export default Header;
