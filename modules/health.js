const CONTENT_JSON = { 'Content-Type': 'application/json' }
const OK_RES = JSON.stringify({ statusCode: 200, message: 'ok' })

const heathHandler = (req, res) => {
    res.writeHead(200, CONTENT_JSON)
    res.end(OK_RES)
}

export default function gracefulShutdown() {
    this.addServerMiddleware({
        path: '/health',
        handler: heathHandler,
        prefix: false
    })
}
