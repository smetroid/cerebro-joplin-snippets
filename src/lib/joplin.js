//import preprocessJson from './preprocessJson';
import axios from 'axios/dist/axios'
//const axios = require('axios')
//import fetch from 'node-fetch'

//var token = settings.get('token')

axios.defaults.baseURL = 'http://localhost:41184'
// axios.interceptors.request.use((config) => {
//   //config.params = config.params || {}
//   //config.params.token = main.settings.joplinToken
//   return config
// })

async function getFolderId (name, settings) {
  const params = {
    token: settings.joplinToken,
  };
  return axios.get('/search?query='+ name +'&type=folder&fields=id', {params}, {
    })
    .then(response => {
      return response.data.items[0].id
    })
    .catch(error => {
      return error
    })
}

async function getNotes (settings) {
  console.log(settings.joplinToken)
  var folderId = await getFolderId("CerebroSnippets", settings)
  const params = {
    token: settings.joplinToken,
  };

  return await axios.get('/folders/'+folderId+'/notes/?query=snippet&type=tag&fields=title,body,id', { params }, {
    })
    .then(response => {
      console.log('am I here response')
      console.log(response.data.items)
      return response.data.items
    })
    .catch(error => {
      console.log('am I here error')
      return error
    })
}

async function createNote(title, body) {
  var folderId = getFolderId()

  const params = {
    parent_id: folderId,
  };

  const note = {
    title,
    body,
  };

  return await axios.post('/notes', note, { params }, {
  })
  .then(response => {
    return response.data.id
  })
  .catch(error => {
    return error
  })
}

function getId(name, data) {
  let maps = data.reduce( (obj, item) => {
    obj[item.title] = item.id
    return obj;
  }, {});
  return maps[name]
}

function deleteNote(id) {
  return axios.delete('/notes/'+id, {
  })
  .then(response => {
    return response
  })
  .catch(error => {
    return error
  })
}

export default {
  async getNotes(settings) { 
    return await getNotes(settings)
  },
  deleteNote(id) {
    return deleteNote(id)
  },
  async createNote(title, body) {
    return await createNote(title, body)
  },
  async editNote(id) {
    return await editNote(id)
  },
  getId(name, data) {
    return getId(name, data)
  }
}

// Memoize your fetched data from external API
//const data = memoize(getNotes(), {
//  length: false,
//  Promise: 'then',
//  maxAge: 30 * 60 * 1000,
//  preFetch: true
//  }
//)

//const notes = getNotes()
// let data 
// const initialize = async () => {
//   data = await getNotes()
//   console.log('am i here initialize')
//   console.log(data)
// }

