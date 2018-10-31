//
//  discovery.js
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 30/10/2018.
//  Copyright © 2018 sahilchaddha.com. All rights reserved.
//

const EventEmitter = require('events')
const dgram = require('dgram')
const url = require('url')

const supportedHeaders = ['id', 'Location', 'power', 'bright', 'model', 'rgb', 'hue', 'sat', 'ct', 'color_mode', 'support']
const options = {
  port: 1982,
  multicastAddr: '239.255.255.250',
  discoveryMsg: 'M-SEARCH * HTTP/1.1\r\nMAN: \"ssdp:discover\"\r\nST: wifi_bulb\r\n',
}

class YeeDiscovery extends EventEmitter {
  constructor() {
    super()
    this.socket = dgram.createSocket('udp4')
  }

  discover() {
    const buffer = Buffer.from(options.discoveryMsg)
    this.socket.send(buffer, 0, buffer.length, options.port, options.multicastAddr)
  }

  listen() {
    this.socket.on('listening', () => {
      this.socket.addMembership(options.multicastAddr)
      this.discover()
      this.emit('started')
    })

    this.socket.on('message', (message) => {
      this.didDiscoverDevice(message)
    })

    try {
      this.socket.bind(options.port, () => {
        this.socket.setBroadcast(true)
      })
    } catch (ex) {
      throw ex;
    }
  }

  didDiscoverDevice(response) {
    const headers = response.toString().split('\r\n');
    var device = {}
    headers.forEach((header) => {
      supportedHeaders.forEach((supportedHeader) => {
        const checkHeader = supportedHeader + ':'
        if (header.indexOf(checkHeader) >= 0) {
          device[supportedHeader] = header.slice(checkHeader.length + 1)
        }
      })
    })

    if (device.id && device.Location) {
      const parsedUrl = url.parse(device.Location)
      device.host = parsedUrl.hostname
      device.port = parsedUrl.port
      this.emit('didDiscoverDevice', device)
    }
  }
}

module.exports = YeeDiscovery
