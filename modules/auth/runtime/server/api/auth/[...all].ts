import { eventHandler, toWebRequest } from 'h3'
import { auth } from '#auth'

export default eventHandler((event) => {
    return auth.handler(toWebRequest(event))
})
