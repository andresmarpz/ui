import { createStitches } from '@stitches/react';

import { gray, blue } from '@radix-ui/colors';

export const {
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme,
    config
} = createStitches({
    theme: {
        colors: {
            ...gray,
            ...blue
        }
    },
    media: {
        bp1: '(min-width: 480px)'
    },
    utils: {
        marginX: (value: number) => ({
            marginLeft: value,
            marginRight: value
        }),
        paddingY: (value: number) => ({
            paddingTop: value,
            paddingBottom: value
        })
    }
});

export const globalStyles = globalCss({
    '@font-face': {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontDisplay: 'optional',
        src: 'url("/assets/fonts/inter-var-latin.woff2")'
    },
    'html, body': {
        padding: 0,
        margin: 0,
        fontFamily: `-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto,
		 Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", sans-serif`
    },
    '*': {
        boxSizing: 'border-box'
    }
});
