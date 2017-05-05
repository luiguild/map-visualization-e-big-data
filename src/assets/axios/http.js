import axios from 'axios'

const local = axios.create({
    baseURL: 'static/json',
    timeout: 100000
})

export {
    local
}
