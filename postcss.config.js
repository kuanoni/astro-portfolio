export default {
	plugins: {
		'postcss-inline-svg': {
			paths: ['src/images/svg'],
			encode,
		},
	},
};

function encode(code) {
	return code
		.replace(/&#xFEFF;/g, '')
		.replace(/%/g, '%25')
		.replace(/</g, '%3C')
		.replace(/>/g, '%3E')
		.replace(/&/g, '%26')
		.replace(/#/g, '%23')
		.replace(/{/g, '%7B')
		.replace(/}/g, '%7D');
}
