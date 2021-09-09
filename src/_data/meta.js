require('dotenv').config()


module.exports = {
	env: process.env.NODE_ENV || 'development ',
	siteURL: 'https://filedn.eu/lkChShz6rvQQfainND8ezhh',
	siteName: "Tout ce qui bouge",
	siteDescription: 'Veille et réflexion sur la technologie, ses usages et mésusages.',
	image: 'assets/UI/linotype.png',
	lang: 'fr',
	locale: 'fr_FR',
	author: 'Baptiste Roullin',
	authorEmail: '',
	zoteroProfileID: process.env.zoteroProfileID || '',
	zoteroAPIKey: process.env.zoteroAPIKey || ''



}
