import * as HoverCard from '@radix-ui/react-hover-card';
import { css, keyframes, styled } from 'stitches.config';
import React from 'react';
import Image from 'next/image';
import Link from './Link';
import ArrowRight from './svgs/ArrowRight';

const StyledImage = css({
    borderRadius: 12
});

const slideUpAndFade = keyframes({
    '0%': { transform: 'translateY(40px)' },
    '100%': { transform: 'translateY(0)' }
});

const slideRightAndFade = keyframes({
    '0%': { transform: 'translateX(-40px)' },
    '100%': { transform: 'translateX(0)' }
});

const slideDownAndFade = keyframes({
    '0%': { transform: 'translateY(-40px)' },
    '100%': { transform: 'translateY(0)' }
});

const slideLeftAndFade = keyframes({
    '0%': { transform: 'translateX(40px)' },
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
        animationDuration: '1s',
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
    image: string;
    children?: React.ReactNode;
}

const LinkPreview = ({
    href,
    image,
    children
}: React.HTMLProps<HTMLAnchorElement> & Props) => {
    return (
        <Root openDelay={70} closeDelay={35}>
            <Trigger asChild>
                <Link href={href}>{children}</Link>
            </Trigger>
            <Content
                sideOffset={12}
                side="top"
                avoidCollisions={true}
                collisionTolerance={15}>
                <Image
                    style={{
                        borderRadius: 8
                    }}
                    src={image}
                    width={230}
                    height={140}
                    alt="link hover image"
                    priority={true}
                />
            </Content>
        </Root>
    );
};

export default LinkPreview;
