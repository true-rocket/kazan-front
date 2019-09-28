 import axios from 'axios'

 const HTTP = axios.create({
   headers: {
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*'
   },
   xsrfHeaderName: 'Csrf-Token',
   withCredentials: true,
   maxContentLength: 50000000,
   timeout: 150000
 })

  export default {
    name: 'back-service',
    components: {},
    props: [],
    data() {
      return {}
    },

    methods: {

      getDataAsync (request) {
        return HTTP.get(request)
          .then(resp => {
            if (resp != 'error') {
              return Promise.resolve(resp)
            } else {
              return Promise.reject(new Error('getting error'))
            }
          })
          .catch(e => {
            console.log(e)
          })
      },

      createAsync (toCreate) {
        let cnfBody = {
          data: toCreate
        }
        return HTTP.post('/create/' + cnfBody)
          .then(resp => {
            if (resp != 'error') {
              return Promise.resolve(resp)
            } else {
              return Promise.reject(new Error('getting error'))
            }
          })
          .catch(e => {
            console.log(e)
          })
      },

      updateAsync (toUpdate) {
        let cnfBody = {
          data: toUpdate
        }
        return HTTP.post('/upd/' + cnfBody)
          .then(resp => {
            if (resp != 'error') {
              return Promise.resolve(resp)
            } else {
              return Promise.reject(new Error('getting error'))
            }
          })
          .catch(e => {
            console.log(e)
          })
      },

      deleteAsync (toDelete) {
        let cnfBody = {
          data: toDelete
        }
        return HTTP.post('/del/' + cnfBody)
          .then(resp => {
            if (resp != 'error') {
              return Promise.resolve(resp)
            } else {
              return Promise.reject(new Error('getting error'))
            }
          })
          .catch(e => {
            console.log(e)
          })
      }
  }
}
