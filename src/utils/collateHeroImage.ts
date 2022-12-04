import truchetNode from '../features/truchet/truchet_node'
const meta = require('../_data/meta')
import path from 'path'


export default async function (data) {
	const slug = data.page.fileSlug
	const hero = data.hero

	let finalName
	if (hero === undefined || Object.keys(hero).length === 0) {
		await truchetNode(slug, 400, 280).catch(console.error)
		//URL absolue
		finalName = `truchet-${slug}.png`
	}
	else if (/\.gif$/.test(hero.image)) {
		finalName = hero.image
	}
	else if (data.contentType === "thread") {

	}
	else { finalName = hero.image }


	return `/${meta.assetsDir}/${path.basename(finalName)}`
}