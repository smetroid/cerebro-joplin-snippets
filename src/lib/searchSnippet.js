import { search } from 'cerebro-tools'

export default async (snippets, query) => {
    // get all snippets
    let data = snippets.map(function(snippet){
        return snippet.title
    })

    console.log(data)

    // return first 5 results
    let matchedEntries = search(data, query);
    return matchedEntries.slice(0, 5);
}