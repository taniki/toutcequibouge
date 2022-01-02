var truchetNode = require('../features/truchet/truchet-node.js');

module.exports = {
  layout: "post",
  permalink: "blog/{{ page.date | dateToFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  tags: [
    "post"
  ],

  author: "{{ meta.author }}",
  eleventyComputed: {

    collatedHeroImage: async (data) => {
      const slug = data.page.fileSlug
      const hero = data.hero

      if (hero === undefined || hero === {}) {
        await truchetNode(slug, 400, 280).catch(console.error);
        return `truchet-${slug}.png`
      }
      else {
        return hero.image
      }

    },
  }
};