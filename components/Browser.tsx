import Box from '@/components/Box';
import LeftArrow from '@/components/svgs/LeftArrow';
import Reload from '@/components/svgs/Reload';
import RightArrow from '@/components/svgs/RightArrow';
import { styled } from '@/stitches.config';
import React from 'react';

const StyledContainer = styled('div', {
    borderRadius: 6,
    border: '1px solid $gray5',
    backgroundColor: '$gray3',
    minWidth: '100%',
    overflow: 'clip',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 0,
    flexWrap: 'nowrap'
});

const StyledIcon = styled('div', {
    padding: '2px 4px',
    marginRight: 6
});

const Dot = styled('div', {
    content: '',
    padding: 6,
    backgroundColor: '$gray6',
    borderRadius: 99,
    marginLeft: 5
});

const Dots = () => {
    return (
        <Box
            css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Dot />
            <Dot />
            <Dot />
        </Box>
    );
};

const BrowserHeader = ({ title }: { title: string }) => {
    return (
        <Box
            css={{
                borderBottom: '1px solid $gray5',
                padding: 8,
                display: 'flex',
                alignItems: 'center',
                width: 'auto'
            }}>
            {/* Controls */}
            <Box
                css={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                <StyledIcon>
                    <LeftArrow />
                </StyledIcon>
                <StyledIcon>
                    <RightArrow />
                </StyledIcon>
                <StyledIcon>
                    <Reload />
                </StyledIcon>
            </Box>
            {/* Title */}
            <Box
                css={{
                    padding: 0,
                    width: '100%'
                }}>
                <Box
                    css={{
                        borderRadius: 4,
                        padding: '4px 8px',
                        color: '$gray11',
                        background: '$background'
                    }}>
                    {title}
                </Box>
            </Box>
            <Box
                css={{
                    marginX: 6
                }}>
                <Dots />
            </Box>
        </Box>
    );
};

interface Props {
    center?: boolean;
}

const Browser = ({ center, children }: React.PropsWithChildren & Props) => {
    return (
        <StyledContainer>
            <BrowserHeader title={'Link-Preview'}></BrowserHeader>
            <Box
                css={{
                    background:
                        'linear-gradient(330deg, $red5 0%, $blue5 100%);',
                    paddingY: 160,
                    minWidth: 100,
                    display: center ? 'flex' : 'block',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                {children}
            </Box>
        </StyledContainer>
    );
};

export default Browser;
