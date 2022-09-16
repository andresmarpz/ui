module.exports = {
    crawlFrom: './pages',
    includeSubComponents: true,
    importedFrom: '@/components/linkpreview/LinkPreview',
    processors: [
        'raw-report',
        async ({ report, output }) => {
            let result = {
                links: []
            };

			try{
				const entries = report['LinkPreview']['instances'];

				entries.forEach((entry) => {
					const url = entry['props']['href'];
					result.links.push(url);
				});
	
				output(result, 'mocks/paths.json');
			}catch(err){
				console.error(err);
			}
            

            return result;
        }
    ]
};
