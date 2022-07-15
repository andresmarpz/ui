import Box from '@/components/Box';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <Box
            css={{
                maxWidth: '692px',
                margin: 'auto',
                padding: 16
            }}>
            <Header />
            <Box
                css={{
                    minHeight: '90vh'
                }}>
                {children}
            </Box>

            <Footer />
        </Box>
    );
};

export default Layout;
