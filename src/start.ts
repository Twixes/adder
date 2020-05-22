#!/usr/bin/env node

import * as http from 'http'
import * as debug from 'debug'
import * as app from './app'

export interface AppError extends Error {
    syscall: string
    code: string
}

debug('eth:server')

function normalizePort(val: string): string | number | null {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return null
}

const port: string | number | null = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server: http.Server = http.createServer(app)

function onError(error: AppError): never {
  if (error.syscall !== 'listen') throw error
  const bind: string = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening(): void {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr && addr!.port
  debug('Listening on ' + bind)
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
