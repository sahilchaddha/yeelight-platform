/* eslint-disable */

const YeeDevice = require('..').Device

const device = new YeeDevice({host: "192.168.0.190", port: 55443})

device.connect()

device.on('deviceUpdate', (newProps) => {
    console.log(newProps)
})

device.on('connected', () => {
    device.sendCommand({
        id: -1,
        method: 'set_power',
        params: [true, 'smooth', '300']
    })
})    
// device.disconnect()