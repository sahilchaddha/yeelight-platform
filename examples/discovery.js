/* eslint-disable */

const YeeDiscovery = require('..').Discovery

const discoveryService = new YeeDiscovery()

discoveryService.on('started', () => {
  console.log('** Discovery Started **')
})

discoveryService.on('didDiscoverDevice', (device) => {
  console.log(device)
})

discoveryService.listen()

/*
    {
        Location: 'yeelight://192.168.x.x:55443',
        id: '0x000000000xxxxx',
        model: 'bslamp1',
        support:
        'get_prop set_default set_power toggle set_bright start_cf stop_cf set_scene cron_add cron_get cron_del set_ct_abx set_rgb set_hsv set_adjust adjust_bright adjust_ct adjust_color set_music set_name',
        power: 'off',
        bright: '1',
        color_mode: '1',
        ct: '2752',
        rgb: '16750592',
        hue: '36',
        sat: '100'
    }
*/
