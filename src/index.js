import { app } from '@electron/remote';

import icon from './icons/joplin_icon.png'
// const deleteIcon = require('./icons/joplin_icon.png');

import initialize from './lib/initialize'
import selectSnippet from './lib/selectSnippet'
import createSnippet from './lib/createSnippet'
import deleteSnippet from './lib/deleteSnippet'

const plugin = async ({ term, display, actions, settings }) => {
    let results = [];

    // split term into command and param
    let command = term.split(' ')[0];
    let param = term.split(' ')[1] || '';

    // list of available commands
    let commands = [
        {
            title: 'Create joplin snippet',
            subtitle: 'from clipboard content',
            term: 'jsnipc',
            icon: icon,
            onSelect: (ev) => {
                ev.preventDefault();
                actions.replaceTerm('jsnipc ');
            }
        },
        {
            title: 'Search snippets',
            term: 'jsnip',
            icon: icon,
            onSelect: (ev) => {
                ev.preventDefault();
                actions.replaceTerm('jsnip ');
            }
        },
        {
            title: 'Delete snippets',
            term: 'jsnipd',
            icon: icon,
            onSelect: (ev) => {
                ev.preventDefault();
                actions.replaceTerm('jsnipd ');
            }
        }
    ];

    // handle different commands
    switch (command) {
        case 'jsnip':
            results = await selectSnippet(param, actions, settings);
            break;
        case 'jsnipc':
            results = createSnippet(param, settings);
            break;
        case 'jsnipd':
            results = await deleteSnippet(param, settings);
            break;
    }

    // search without keyword "snip"
    if (settings.disableSearchKeyword && param === '') {
        results = selectSnippet(snippetsDir, command, actions);
    }

    // add autocomplete for possible commands
    results = [
        ...results,
        ...commands.filter(item => (command != item.term && item.term.indexOf(command) !== -1))
    ];

    // display results
    if (results.length > 0) {
        // add icon to results
        results.map(obj => {
            if (!obj.icon) {
                obj.icon = icon
            }
        });

        display(results);
    }

}

export default {
    initialize,
    fn: plugin,
    icon: icon,
    settings: {
        disableSearchKeyword: {
            type: "bool",
            label: 'Search without keyword "jsnip"',
            defaultValue: false,
        },
        joplinToken: {
            type: "string",
            label: "Joplin API Token",
            defaultValue: ""
        }
    }
};