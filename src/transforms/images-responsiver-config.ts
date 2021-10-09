const transformPicture = require("@11ty/eleventy-img");
import path from "path";
const imageSize = require('image-size')
module.exports = {

	default: {
		// TODO : Tester cache. Par exemple "truchet-interet legitime.jpg" est-il mis en cache une seule fois.
<<<<<<< HEAD
		selector: '#content :not(picture)  > img[src]:not([srcset]):not([src$=".svg"]):not([src$=".gif"])',
=======
		selector: ":not(.page-home) #content :not(picture)  > img[src]:not([srcset]):not([src$='.svg']):not([src$='.gif'])",
>>>>>>> home
		minWidth: 360,
		maxWidth: 1920,
		fallbackWidth: 750,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: (src, width) => {
			if (!(new RegExp('^/').test(src)) || src !== "") {
				src = "/assets/generatedImages/" + src
			}
			return src.
				replace(
<<<<<<< HEAD
					/\/assets\/*.\//,
					'/assets/generatedImages/'
				).
=======
					/\/assets\/.*\//,
					'/assets/generatedImages/').
>>>>>>> home
				replace(
					/^(.*)(\.[^\.]+)$/,
					'$1-' + width + '.jpg')
		},
		runBefore: async (image, document) => {
			let originalPath = image.getAttribute('src')
			const intermediaryPath = "src/assets/imagesToProcess/" + path.basename(originalPath)

			try {
				const imageDimensions = imageSize(intermediaryPath);
				image.setAttribute('width', imageDimensions.width);
				image.setAttribute('height', imageDimensions.height);

				const options = {
					sharpWebpOptions: {
						quality: 90,
					},
					widths: [360, 750, imageDimensions.width, 1140, 1530, 1920],
					dryRun: false,
					formats: ['webp', 'jpeg'],
					urlPath: '/assets/imagesToProcess/',
					outputDir: './dist/assets/generatedImages/',
					filenameFormat: function (id, src, width, format, options) {
						const extension = path.extname(src);
						const name = path.basename(src, extension);
						const modifiedFormat = (format === 'jpeg' ? 'jpg' : format);
						return `${name}-${width}.${modifiedFormat}`;
					}
				}

				/*		const exists = promisify(require("fs").exists);
						if (!(await exists(intermediaryPath))) {
							console.log(intermediaryPath + 'debug : existe pas')
						}*/
				await transformPicture(decodeURI(intermediaryPath), options);

				image.dataset.responsiver = image.className;
				//image.dataset.responsiveruRL = metadata.jpg.url;
				image.dataset.size = image.className;

			}
			catch (e) {
				console.log("debug:    " + e)
			}
		},
		runAfter: (image, document) => {
			//image.setAttribute('src', image.dataset.responsiveruRL);
			//let caption = image.getAttribute("title");
			if (image.closest('.rich-picture')) {
				const link = document.createElement("a");
				link.setAttribute("data-pswp-srcset", image.getAttribute('srcset'));

				link.setAttribute("href", image.getAttribute('src'));
				link.appendChild(image.cloneNode(true));
				link.setAttribute('data-pswp-width', image.width);
				link.setAttribute('data-pswp-height', image.height);
				image.replaceWith(link);

			}
		},
		steps: 5,
		classes: ['img-default'],
		attributes: { loading: 'lazy', },
	},
	gallery_3x2: {
	},
}
