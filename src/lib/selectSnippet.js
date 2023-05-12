//const jop = require('joplin');
import Preview from './preview'
import searchSnippet from './searchSnippet'
import Joplin from './joplin'

export default async (query, actions, settings) => {
    Joplin.settings = settings
    var data = await Joplin.getNotes(settings)
    // get snippets & their content
    // for some reason we need an await for the searchSnippet
    // else you will get a promise issue
    var snippets = await searchSnippet(data, query)
    let content = data.reduce( (obj, item) => {
        obj[item.title] = item 
        return obj
    }, {});
    if (!Array.isArray(snippets)) {
        console.error('snippets is not an array')
    }
    return snippets.map((name) => {
        const previewHighlight = name.includes('.') ? name.split('.').pop() : 'nohighlight';
        const previewContent = content[name].body || ''

        return {
            title: name,
            subtitle: 'copy content to clipboard',
            term: 'jsnip',
            clipboard: previewContent,
            onSelect: () => actions.copyToClipboard(previewContent),
            getPreview: () => (
                <Preview highlight={ previewHighlight } content={ previewContent } />
            ),
        }
    })
}