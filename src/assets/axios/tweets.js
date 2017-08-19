import { remote } from './http'

export const getAllTweets = ({
    long,
    lat,
    range,
    count
}) => {
    return remote.get(`/${lat}/${long}/${range}/${count}`, {})
}
