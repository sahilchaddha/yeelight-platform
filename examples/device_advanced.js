/* eslint-disable */

const YeeDevice = require('..').Device

const device = new YeeDevice({host: "192.168.0.182", port: 55443, debug: true, interval: 5000})

device.connect()

device.on('deviceUpdate', (newProps) => {
    console.log(newProps)
})

device.on('connected', () => {
    console.log('Connected')
})  

device.on('disconnected', () => {
    console.log('Disconnected')
})

setTimeout(() => {
    console.log('Force Disconnecting')
    device.disconnect()
    setTimeout(() => {
        console.log('Force Connecting')
        device.connect()
    }, 10000)
}, 20000)