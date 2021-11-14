import { Config, UserConfig, } from './types/eleventy';

const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const yaml = require("js-yaml");
const imagesResponsiver = require("eleventy-plugin-images-responsiver");
require('dotenv').config()
const embedEverything = require("eleventy-plugin-embed-everything");

module.exports = function (config: Config): UserConfig {

	/**
	 * Opts in to a full deep merge when combining the Data Cascade.
	 * Per the link below, "This will likely become the default in an upcoming major version."
	 * So I'm going to implement it now.
	 */
	config.setDataDeepMerge(true)


	/**
 * Custom Watch Targets
 * for when the Tailwind config or .css files change...
 * by default not watched by 11ty
 */
	config.addWatchTarget('./src/assets/css/')
	config.addWatchTarget('./src/assets/scripts/')
	config.addWatchTarget('./src/*.js')
	config.addWatchTarget('./tailwind.config.js')
	config.setWatchThrottleWaitTime(200);

	config.setWatchJavaScriptDependencies(true);



	/**
 * Passthrough File Copy

cf. webpack.configs.js pour le JS
cf. postcss.config.js pour le CSS

*/

	//On copie tels quels les média avec chemins relatifs ou absolus dans /dist, qu'ils puissent être lus par du balisage non-transformé (sans srcset ou gif -> vidéo)

	config.addPassthroughCopy({ 'src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}': 'assets/generatedImages' })
	config.addPassthroughCopy({ 'src/assets/images/*.{png,webp,gif,mp4,jpg,jpeg}': 'assets/generatedImages' })

	config.addPassthroughCopy('src/assets/docs/')

	config.addPassthroughCopy('src/posts/**/*.gif')
	config.addPassthroughCopy('src/*.ico')
	config.addPassthroughCopy('src/robots.txt')
	config.addPassthroughCopy('src/assets/css/fonts')
	config.addPassthroughCopy('src/assets/UI')

	config.setUseGitIgnore(false)


	/**
	 * Add layout aliases
	 */
	config.addLayoutAlias('base', 'layouts/base.njk')
	config.addLayoutAlias('page', 'layouts/page.njk')
	config.addLayoutAlias('post', 'layouts/post.njk')
	config.addLayoutAlias('post-canvas', 'layouts/post-canvas.njk')


	/**
	 * Plugins
	 */

	config.addPlugin(pluginNavigation)
	config.addPlugin(embedEverything, {
		use: ['vimeo', 'youtube', 'twitter'], twitter: { options: { align: 'center' } }
	});

	if (process.env.NODE_ENV === "production") {
		config.addPlugin(imagesResponsiver, require('./src/transforms/images-responsiver-config.ts'))
		config.addPlugin(require('./src/transforms/gif-converter.ts'))
	}
	config.addPlugin(pluginRss)


	/**
	 * Filters
	 */
	const filters = require('./src/filters/filters.ts')

	Object.keys(filters).forEach((filterName) => {
		config.addFilter(filterName, filters[filterName])
	})

	/*	const asyncFilters = require('./src/filters/asyncFilters.ts')
		Object.keys(asyncFilters).forEach((filterName) => {
			config.addNunjucksAsyncFilter(filterName, filters[filterName])
		})
	*/


	/**
	 * Transforms
	 */
	/*const transforms = require('./src/transforms/transforms.js')

	Object.keys(transforms).forEach((transformName) => {
		config.addTransform(transformName, transforms[transformName])
	})
*/

	/**
	 * Shortcodes
	 */
	const shortcodes = require('./src/shortcodes/shortcodes.js')

	Object.keys(shortcodes).forEach((shortcodeName) => {
		config.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	/**
	 * Paired Shortcodes
	 */
	const pairedshortcodes = require('./src/shortcodes/pairedShortcodes.js')
	Object.keys(pairedshortcodes).forEach((shortcodeName) => {
		config.addPairedShortcode(shortcodeName, pairedshortcodes[shortcodeName]
		)
	})

	/**
	 * Add async shortcodes
	 *
	 */

	const asyncShortcodes = require('./src/shortcodes/asyncShortcodes.js')
	Object.keys(asyncShortcodes).forEach((shortcodeName) => {
		config.addNunjucksAsyncShortcode(shortcodeName, asyncShortcodes[shortcodeName])
	})


	/**
	MARKDOWN
	*/
	config.addDataExtension("yaml", contents => yaml.safeLoad(contents));

	config.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_alias: 'description',
		//Si <!-- excerpt --> est présent, sa valeur remplit le tag description, pas page.description.
		excerpt_separator: "<!-- excerpt -->"
	});

	const md = require('./src/markdown.js')
	config.setLibrary('md', require('./src/markdown.js'));



	/**
 * Collections
 * ============================

 */

	const collections = require('./src/collections.ts')

	Object.keys(collections).forEach((colName) => {
		config.addCollection(colName, collections[colName])
	})


	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: '_templates',
			data: '_data',
		},
		passthroughFileCopy: true,
		templateFormats: ['html', 'njk', 'md'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	}
}
