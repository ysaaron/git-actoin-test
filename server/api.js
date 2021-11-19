const express = require('express')
const app = express()

const PORT = process.env.PORT || 31000

app.get('/time', (req, res) => {
    res.send(JSON.stringify({
        currentTime: Date.now()
    }))
})

const server = app.listen(PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`API server is running on http://${host}:${port}`)
})
