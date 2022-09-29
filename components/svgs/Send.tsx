import React from 'react';

interface Props {
    fill?: string;
}

const Send = React.forwardRef<
    React.ElementRef<'svg'>,
    React.ComponentProps<'svg'> & Props
>((props, forwardedRef) => {
    const { fill, ...itemProps } = props;
    return (
        <svg
			ref={forwardedRef}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
			{...itemProps}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 32.0012C24.8366 32.0012 32 24.8375 32 16.0006C32 7.16372 24.8366 0 16 0C7.16344 0 0 7.16372 0 16.0006C0 24.8375 7.16344 32.0012 16 32.0012ZM23.4142 14.5863L17.4142 8.58612C16.6332 7.80504 15.3668 7.80504 14.5858 8.58612L8.58579 14.5863C7.80474 15.3674 7.80474 16.6338 8.58579 17.4149C9.36684 18.196 10.6332 18.196 11.4142 17.4149L14 14.829L14 22.0008C14 23.1055 14.8954 24.0009 16 24.0009C17.1046 24.0009 18 23.1055 18 22.0008V14.829L20.5858 17.4149C21.3668 18.196 22.6332 18.196 23.4142 17.4149C24.1953 16.6338 24.1953 15.3674 23.4142 14.5863Z"
                fill={fill}
            />
        </svg>
    );
});
Send.displayName = 'Send';

export default Send;
