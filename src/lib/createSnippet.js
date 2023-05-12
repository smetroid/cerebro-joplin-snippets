import { clipboard } from 'electron'
import Joplin from './joplin'

export default (name) => {
    let title = `Create snippet called "${name}"`;
    let error = `Snippet name can't be empty`;

    return [{
        title: name === '' ? error : title,
        subtitle: 'save clipboard content in snippet',
        term: 'jsnipc',
        onSelect: () => {
            if (!name) {
                return;
            }
            Joplin.createNote(name, clipboard.readText())
        }
    }];
}