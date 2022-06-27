import Box from '@/components/Box';
import Footer from '@/components/Footer';
import React from 'react';
const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <Box
            css={{
                margin: 'auto',
                padding: 16,
                maxWidth: '692px',
                minHeight: '100vh'
            }}>
            {children}
            <Footer />
        </Box>
    );
};

export default Layout;
