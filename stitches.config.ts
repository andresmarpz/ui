import { createStitches } from '@stitches/react';

import {
	blue,
	blueDark,
	gray,
	grayDark,
	red,
	redDark,
	slate,
	slateDark
} from '@radix-ui/colors';

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
			background: 'white',
			subtleBackground: gray.gray2,
			elementBackground: blue.blue3,
			hoverElementBackground: blue.blue4,
			activeElementBackground: blue.blue5,
			subtleBorder: gray.gray6,
			elementBorder: blue.blue7,
			hoveredElementBorder: blue.blue8,
			solidBackground: gray.gray9,
			hoveredSolidBackground: gray.gray10,
			textPrimary: gray.gray11,
			textHighlight: slate.slate12,
			...gray,
			...slate,
			...blue,
			...red
		}
	},
	media: {
		bp1: '(min-width: 480px)'
	},
	utils: {
		marginY: (value: number | string) => ({
			marginTop: value,
			marginBottom: value
		}),
		marginX: (value: number | string) => ({
			marginLeft: value,
			marginRight: value
		}),
		paddingY: (value: number | string) => ({
			paddingTop: value,
			paddingBottom: value
		}),
		paddingX: (value: number | string) => ({
			paddingLeft: value,
			paddingRight: value
		})
	}
});

export const darkTheme = createTheme({
	colors: {
		background: grayDark.gray1,
		subtleBackground: grayDark.gray2,
		elementBackground: blueDark.blue3,
		hoverElementBackground: blueDark.blue4,
		activeElementBackground: blueDark.blue5,
		subtleBorder: grayDark.gray6,
		elementBorder: blueDark.blue7,
		hoveredElementBorder: blueDark.blue8,
		solidBackground: grayDark.gray9,
		hoveredSolidBackground: grayDark.gray10,
		textPrimary: grayDark.gray11,
		textHighlight: slateDark.slate12,
		...grayDark,
		...slateDark,
		...blueDark,
		...redDark
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
		backgroundColor: theme.colors.background,
		padding: 0,
		margin: 0,
		fontFamily: `-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Roboto,
		 Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", sans-serif`
	},
	'*': {
		boxSizing: 'border-box'
	}
});
