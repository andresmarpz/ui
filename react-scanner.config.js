module.exports = {
    crawlFrom: './pages',
    includeSubComponents: true,
    importedFrom: '@/components/LinkPreview',
    processors: [
        [
            'raw-report',
            {
                outputTo: './mocks/links.json'
            }
        ]
    ]
};
