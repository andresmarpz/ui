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
        domains: [
            's2.googleusercontent.com',
            't0.gstatic.com',
            'favicon.yandex.net',
            'github.com'
        ]
    }
};

module.exports = nextConfig;
