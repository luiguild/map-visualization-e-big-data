import { local } from './http'

export const getAllLayers = () => {
    return local.get('/layers.json', {})
}
