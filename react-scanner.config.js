module.exports = {
    crawlFrom: './pages',
    includeSubComponents: true,
    importedFrom: '@/components/LinkPreview',
    processors: [
        'raw-report',
        async ({ report, output }) => {
            let result = {
                links: []
            };

            const entries = report['LinkPreview']['instances'];

            entries.forEach((entry) => {
                const url = entry['props']['href'];
                result.links.push(url);
            });

            output(result, 'mocks/paths.json');

            return result;
        }
    ]
};
