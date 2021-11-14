
module.exports = async function (slug, width, height) {

	const { createCanvas } = require('canvas')
	const fs = require('fs')
	const promises = require('stream');
	const pipeline = promises.pipeline
	//@ts-ignore
	const truchet = require('./truchet-core.ts')

	const path = 'src/assets/imagesToProcess/truchet-' + slug + '.png'


	const tileCanvas = await truchet(
		createCanvas(width, height), createCanvas(width, height), { height: height, width: width }, 'node')
	await pipeline(
		tileCanvas.createPNGStream({ compressionLevel: 2 }),
		fs.createWriteStream(path),
		function () { }
	)
}