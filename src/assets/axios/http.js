import axios from 'axios'

const local = axios.create({
    baseURL: 'static/json',
    timeout: 100000
})

const remote = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 100000
})

export {
    local,
    remote
}
