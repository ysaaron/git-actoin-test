const CONTENT_JSON = { 'Content-Type': 'application/json' }
const ERROR_RES = JSON.stringify({ statusCode: 500, message: 'not ok' })
const OK_RES = JSON.stringify({ statusCode: 200, message: 'ok' })

let signal = false
const resolveSignal = () => signal
const heathHandler = (req, res) => {
    res.writeHead(200, CONTENT_JSON)
    res.end(OK_RES)
}

export default function gracefulShutdown(/* moduleOptions */) {
    this.addServerMiddleware({
        path: '/health',
        handler: heathHandler,
        prefix: false
    })
}
