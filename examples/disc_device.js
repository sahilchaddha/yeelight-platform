/* eslint-disable */

const YeeDiscovery = require('..').Discovery
const YeeDevice = require('..').Device

const discoveryService = new YeeDiscovery()

discoveryService.on('started', () => {
  console.log('** Discovery Started **')
})

discoveryService.on('didDiscoverDevice', (device) => {
  const newDevice = new YeeDevice(device)
})

discoveryService.listen()