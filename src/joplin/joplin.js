import { memoize, search } from 'cerebro-tools';
//import preprocessJson from './preprocessJson';
import axios from 'axios'

var token = settings.get('token')
// var notebook = settings.get('notebook')
axios.defaults.baseURL = 'localhost:81184'
axios.interceptors.request.use((config) => {
  config.params = config.params || {}
  config.params.token = ''
  return config
})

function getSnippetTagId () {
    return axios.get('/search?query=snippet&type=tag&fields=id',{
      })
      .then(response => {
        console.log(response.data)
        return response.data.items[0].id
      })
      .catch(error => {
        return error
      })
}

function getNotes(id) {
    return axios.get('/search?query=snippet&type=tag&fields=id',{
      })
      .then(response => {
        console.log(response.data)
        return response.data.items[0].id
      })
      .catch(error => {
        return error
      })

}

function getAllSnippetNotes () {
    var snippetTagId = this.getSnippetTagId()
    return axios.get('/tags/'+snippetTagId+'/notes?&fields=id,title,body,updated_time,', {
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error
      })
      .finally(() => {
        console.log('getAllNotes finish')
      })
}

// Memoize your fetched data from external API
const data = memoize(getAllNotes(), {
  length: false,
  Promise: 'then',
  maxAge: 30 * 60 * 1000,
  preFetch: true
  }
)

const fn = ({ term, display }) => {
  // Put your plugin code here
  notebook = "CerebroSnippets"
  token = ""
  snippet_list = []
  display({
    title: `This is JopSnippets ${term}`,
  })
}

module.exports = {
  name: 'Joplin Snippets',
  keyword: 'js',
  fn,
  icon
}