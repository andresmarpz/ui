/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/fonts/inter-var-latin.woff2',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            }
        ];
    },
    images: {
        domains: ['cataas.com', 'www.google.com', 't1.gstatic.com']
    }
};

module.exports = nextConfig;
