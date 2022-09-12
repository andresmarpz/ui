import BlurImage from '@/components/global/BlurImage';
import { ImageData } from '@/lib/scanner';
import { keyframes, styled, theme } from '@/stitches.config';
import * as HoverCard from '@radix-ui/react-hover-card';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useState } from 'react';

const slideUpAndFade = keyframes({
    '0%': { transform: 'translateY(20px) scale(0)' },
    '100%': { transform: 'translateY(0) scale(1)' }
});

const slideRightAndFade = keyframes({
    '0%': { transform: 'translateX(-20px) scale(0)' },
    '100%': { transform: 'translateX(0) scale(1)' }
});

const slideDownAndFade = keyframes({
    '0%': { transform: 'translateY(-20px) scale(0)' },
    '100%': { transform: 'translateY(0) scale(1)' }
});

const slideLeftAndFade = keyframes({
    '0%': { transform: 'translateX(20px) scale(0)' },
    '100%': { transform: 'translateX(0) scale(1)' }
});

const StyledRoot = styled(HoverCard.Root, {
    position: 'relative'
});

const StyledContent = styled(HoverCard.Content, {
    padding: 8,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$gray2',

    borderRadius: 16,
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px`,
    transformOrigin: 'var(--radix-hover-card-content-transform-origin)',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '300ms',
        animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        animationFillMode: 'forwards',
        willChange: 'transform, opacity',
        '&[data-state="open"]': {
            '&[data-side="top"]': { animationName: slideDownAndFade },
            '&[data-side="right"]': { animationName: slideLeftAndFade },
            '&[data-side="bottom"]': { animationName: slideUpAndFade },
            '&[data-side="left"]': { animationName: slideRightAndFade }
        }
    }
});

const Root = StyledRoot;
const Content = StyledContent;
const Trigger = HoverCard.Trigger;

const StyledLink = styled('a', {
    lineHeight: 1.6,
    position: 'relative',
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    verticalAlign: 'bottom',

    color: '$textHighlight',
    textDecoration: 'none',
    fontWeight: 500,
    borderRadius: 3,
    paddingX: 3,

    transition: 'background-color 0.175s ease-in-out',
    '&:hover': {
        backgroundColor: '$gray3'
    }
});

interface Props {
    href: string;
    showcase?: true | undefined;
    imageData: ImageData | undefined;
    children?: React.ReactNode;
}

const LinkPreview = ({
    imageData,
    showcase,
    children
}: Props & React.HTMLProps<HTMLAnchorElement>) => {
    const [didBlur, setDidBlur] = useState(false);

    const { resolvedTheme } = useTheme();

    if (!imageData) return <></>;
    const { base64, src, href, favicon } = imageData;

    return (
        <Root openDelay={60} closeDelay={60}>
            <Trigger asChild>
                <StyledLink href={href} target="_blank" rel="noreferrer">
                    <Image
                        style={{
                            color: resolvedTheme
                                ? theme.colors.textHighlight.toString()
                                : 'currentColor'
                        }}
                        src={favicon}
                        width={16}
                        height={16}
                        objectFit="contain"
                        priority={true}
                        quality={100}
                        alt={`${href} favicon`}
                    />
                    {children}
                </StyledLink>
            </Trigger>
            <Content
                sideOffset={12}
                side="top"
                avoidCollisions={true}
                collisionTolerance={15}
                forceMount={showcase}>
                <a href={href} target="_blank" rel="noreferrer">
                    <BlurImage
                        setDidBlur={setDidBlur}
                        shouldBlur={didBlur === false}
                        src={src}
                        width={240}
                        height={150}
                        base64={base64}
                    />
                </a>
            </Content>
        </Root>
    );
};

export default LinkPreview;
