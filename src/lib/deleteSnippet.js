import fs from 'fs'
import searchSnippet from './searchSnippet'
import icon from '../icons/joplin_icon.png'
import Joplin from './joplin'

export default async (query) => {
    // get snippets
    var data = await Joplin.getNotes()
    var snippets = await searchSnippet(data, query)

    return snippets.map((name) => ({
        title: `Delete snippet "${name}"`,
        icon: icon,
        term: 'jsnipd',
        
        onSelect: () => Joplin.deleteNote(Joplin.getId(name, data))
    }));
}