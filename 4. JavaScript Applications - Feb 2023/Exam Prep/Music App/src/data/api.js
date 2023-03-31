import {getUserData, clearUserData} from '../util.js'


const host = 'http://localhost:3030'

async function request(method, url, data) {
    const options = {
        method,
        headers : {}
    }

    // load user data
    const userData = getUserData()
    if (userData) {
        const token = userData.accessToken
        options.headers['X-Authorization'] = token

    }

    if (data !== undefined) {
        options.headers['Content-type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(host + url, options)
  

        let result

        // Response X - in case we don't have content
        if (response.status != 204) {
            result = await response.json()
        }

        // Response X - in case we have a problem with the response
        if (response.ok == false) {

            //403 - the server is restarted and the token is invalidated 
            if (response.status == 403) {
                clearUserData()
            }
            const error = result
            throw error

        }

        // Response OK. If result == undefined we have status 204, otherwise everything is ok.
        return result
        
    } catch (error) {
        alert(error.message)
        throw error

    }

}


export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')