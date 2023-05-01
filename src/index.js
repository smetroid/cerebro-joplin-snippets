
const fn = ({ term, display }) => {
  // Put your plugin code here
  display({
    title: `Joplin Snippets: ${term}`
  })
}

module.exports = {
  name: 'Joplin Snippets',
  keyword: 'js',
  fn,
}