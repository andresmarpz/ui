import Image from 'next/image';
import Box from './Box';

interface Props {
    src: string;
    width: number;
    height: number;
}

const Showcase = ({ src, width, height }: Props) => {
    return (
        <Box
            css={{
                filter: 'saturation(0.0)',
                '&:hover': {
                    filter: 'saturation(1.0)'
                }
            }}>
            <Image alt="" src={src} width={width} height={height} />
        </Box>
    );
};

export default Showcase;
