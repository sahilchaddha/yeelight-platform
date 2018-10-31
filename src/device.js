//
//  device.js
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 30/10/2018.
//  Copyright © 2018 sahilchaddha.com. All rights reserved.
//

const EventEmitter = require('events')
const net = require('net')

class YeeDevice extends EventEmitter {
  constructor(device) {
    super()
    this.device = device
    this.debug = this.device.debug || false
    this.connected = false
    this.forceDisconnect = false
    this.timer = null
    this.retry_timer = null
  }

  connect() {
    try {
      this.forceDisconnect = false
      this.socket = new net.Socket()
      this.bindSocket()
      this.socket.connect({ host: this.device.host, port: this.device.port }, () => {
        this.didConnect()
        this.emit('connected')
      })
    } catch (err) {
      this.socketClosed(err)
    }
  }

  disconnect(forceDisconnect = true) {
    this.forceDisconnect = forceDisconnect
    this.connected = false
    clearInterval(this.timer)
    this.socket.destroy()
    this.socket = null
    this.emit('disconnected')
  }

  bindSocket() {
    this.socket.on('data', (data) => {
      this.didReceiveResponse(data)
    })

    this.socket.on('error', (err) => {
      this.emit('socketError', err)
      this.socketClosed(err)
    })

    this.socket.on('end', () => {
      this.emit('socketEnd')
      this.socketClosed()
    })
  }

  socketClosed(err) {
    if (this.forceDisconnect) return

    if (err && this.debug) {
      console.log('Socket Closed :', err)
      console.log('Reconnecting in 5 secs')
    }
    this.disconnect(false)
    if (this.retry_timer) {
      clearTimeout(this.retry_timer)
    }
    this.retry_timer = setTimeout(this.connect.bind(this), 5000)
  }

  didConnect() {
    this.connected = true
    this.timer = setInterval(this.sendHeartBeat.bind(this), 5000)
  }

  sendHeartBeat() {
    this.sendCommand({
      id: 199,
      method: 'get_prop',
      params: ['power', 'bright', 'rgb', 'flowing', 'flow_params', 'hue', 'sat', 'ct'],
    })
  }

  didReceiveResponse(data) {
    const response = JSON.parse(data.toString('utf8'))
    this.emit('deviceUpdate', response)
  }

  sendCommand(data) {
    const cmd = JSON.stringify(data)
    if (this.connected && this.socket) {
      try {
        this.socket.write(cmd + '\r\n')
      } catch (err) {
        this.socketClosed(err)
      }
    }
  }

  updateDevice(device) {
    this.device = device
  }
}

module.exports = YeeDevice
