const rssPlugin = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

// Import filters
const dateFilter = require('./src/_filters/date-filter')
const w3DateFilter = require('./src/_filters/w3-date-filter')
const filters = require('./src/_filters/filters')

module.exports = function (eleventyConfig) {
  // Filters
  eleventyConfig.addFilter('dateFilter', dateFilter)
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter)

  eleventyConfig.addFilter('randomItem', (arr) => {
    arr.sort(() => {
      return 0.5 - Math.random()
    })
    return arr.slice(0, 1)
  })

  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  // Pass through
  eleventyConfig.addPassthroughCopy('README.md')
  eleventyConfig.addPassthroughCopy('src/assets/imgs')
  eleventyConfig.addPassthroughCopy('src/assets/js')
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/keybase.txt')
  eleventyConfig.addPassthroughCopy('src/humans.txt')
  eleventyConfig.addPassthroughCopy('src/site.webmanifest')
  eleventyConfig.addPassthroughCopy('src/browserconfig.xml')
  eleventyConfig.addPassthroughCopy('src/192.png')
  eleventyConfig.addPassthroughCopy('src/512.png')
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy('src/icon.svg')
  eleventyConfig.addPassthroughCopy('.well-known/')

  eleventyConfig.addCollection('posts', function (collection) {
    return collection.getFilteredByGlob('./src/blog/*.md')
  })
  eleventyConfig.addCollection('notes', function (collection) {
    return collection.getFilteredByGlob('./src/notes/*.md')
  })
  eleventyConfig.addCollection('photos', function (collection) {
    return collection.getFilteredByGlob('./src/photos/*.md')
  })
  eleventyConfig.addCollection('design', function (collection) {
    return collection.getFilteredByTag('design')
  })

  // Universal Shortcodes
  eleventyConfig.cloudinaryCloudName = 'juanfernandes'
  eleventyConfig.addShortcode('cloudinaryImage', function (path, transforms, alt) {
    return `<img src="https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/${transforms}/${path}" alt="${alt}">`
  })

  eleventyConfig.addShortcode('fyi', function (content) {
    return `<aside class="fyi"><p>${content}</p></aside>`
  })

  // Layout aliases
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

  // Plugins
  eleventyConfig.addPlugin(rssPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)

  // Watch
  eleventyConfig.addWatchTarget('./src/assets/css/')

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html']
  }
}
