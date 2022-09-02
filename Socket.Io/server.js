const http = require('http')
const io = require('socket.io')

const server = http.createServer()
const socketServer = io(server)

socketServer.on('connection', socket => {
    socket.emit()
})

server.listen(3000)
console.log('listening at port 3000');