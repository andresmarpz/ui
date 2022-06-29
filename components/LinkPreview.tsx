import * as HoverCard from '@radix-ui/react-hover-card';
import { keyframes, styled } from 'stitches.config';
import Link from './Link';
import BlurImage from './BlurImage';
import { ImageData } from '@/pages/link-preview';
import { useState } from 'react';

const slideUpAndFade = keyframes({
    '0%': { transform: 'translateY(20px)' },
    '100%': { transform: 'translateY(0)' }
});

const slideRightAndFade = keyframes({
    '0%': { transform: 'translateX(-20px)' },
    '100%': { transform: 'translateX(0)' }
});

const slideDownAndFade = keyframes({
    '0%': { transform: 'translateY(-20px)' },
    '100%': { transform: 'translateY(0)' }
});

const slideLeftAndFade = keyframes({
    '0%': { transform: 'translateX(20px)' },
    '100%': { transform: 'translateX(0)' }
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
    backgroundColor: 'white',

    borderRadius: 8,
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

const StyledTrigger = styled(HoverCard.Trigger, {});

const Root = StyledRoot;
const Content = StyledContent;
const Trigger = StyledTrigger;

interface Props {
    href: string;
    imageData: ImageData | undefined;
    children?: React.ReactNode;
}

const LinkPreview = ({
    imageData,
    children
}: Props & React.HTMLProps<HTMLAnchorElement>) => {
    const [didBlur, setDidBlur] = useState(false);
    if (!imageData) return <></>;
    const { base64, src, href } = imageData;

    return (
        <Root openDelay={70} closeDelay={35}>
            <Trigger asChild>
                <Link href={href} target="_blank" rel="noreferrer">
                    {children}
                </Link>
            </Trigger>
            <Content
                sideOffset={12}
                side="top"
                avoidCollisions={true}
                collisionTolerance={15}>
                <a href={href} target="_blank" rel="noreferrer">
                    <BlurImage
                        setDidBlur={setDidBlur}
                        shouldBlur={didBlur === false}
                        src={src}
                        width={250}
                        height={180}
                        base64={base64}
                    />
                </a>
            </Content>
        </Root>
    );
};

export default LinkPreview;
