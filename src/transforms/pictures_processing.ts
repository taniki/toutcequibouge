// https://github.com/nhoizey/images-responsiver/
// https://github.com/google/eleventy-high-performance-blog


const path = require("path")
require('dotenv').config()

const { parseHTML } = require('linkedom');
const { handleGIFs } = require('./pictures_animated.ts')
const handlePictures = require('./pictures_static.ts')


function reformatURL(src: string, width): string {
	const fullPath = `/${meta.assetsDir}/${path.basename(src)}`

	return fullPath.
		replace(
			/^(.*)(\.[^\.]+)$/,
			'$1-' + width + '.jpg')
}

const globalSettings = {
	selector: " #content :not(picture) > img[src]:not([srcset]):not([src$='.svg'])",
	minWidth: 360,
	maxWidth: 1920,
	fallbackWidth: 750,
	sizes: '(max-width: 60rem) 90vw, 60rem',
	resizedImageUrl: "",
	steps: 5,
	classes: ['img-default'],
	attributes: { loading: 'lazy', },
	ignore: 'truchet-'
}

module.exports = function pictures_processing(html, globalSettings) {

	const { document } = parseHTML(html);

	[...document.querySelectorAll(globalSettings.selector)]
		.filter((image) =>
			!((new RegExp(globalSettings.ignore)).test(image.getAttribute('src')))
		)
		.filter((image) => {
			// filter out images without a src, or not SVG, or with already a srcset
			return (
				image.getAttribute('src') !== null &&
				!image.getAttribute('src').match(/\.svg$/) &&
				image.getAttribute('srcset') === null
			);
		})
		.forEach(async (image) => {

			if (image.getAttribute('src').match(/\.gif$/)) {
				await handleGIFs(image)
			}
			else {
				handlePictures(image, document, globalSettings)
			}
		});

	return document.toString();
};

