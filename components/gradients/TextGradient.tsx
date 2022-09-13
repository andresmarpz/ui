import { styled } from '@/stitches.config'
import React from 'react'

const StyledText = styled('p', {
    display: 'inline-block',
    fontWeight: 700,
    fontSize: '32px'
})

interface Props {
    gradient: string
}

const TextGradient: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    gradient
}) => {
    return (
        <StyledText
            css={{
                background: gradient,
                backgroundColor: '$textHighlight',
                backgroundClip: 'text',
                color: 'transparent'
            }}>
            {children}
        </StyledText>
    )
}

export default TextGradient
