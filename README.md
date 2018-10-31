# yeelight-platform

[![NPM](https://nodei.co/npm/yeelight-platform.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yeelight-platform/)

[![npm](https://img.shields.io/npm/dm/yeelight-platform.svg)](https://www.npmjs.com/package/yeelight-platform)
[![npm](https://img.shields.io/npm/v/yeelight-platform.svg)](https://www.npmjs.com/package/yeelight-platform)
[![CircleCI](https://circleci.com/gh/sahilchaddha/yeelight-platform.svg?style=svg)](https://circleci.com/gh/sahilchaddha/yeelight-platform)


**Yet Another Yeelight API written in JS**

## Description

This package supports discovering, connecting and controlling Yeelight Devices.
`yeelight-platform` is a zero-dependency solution for controlling Xiaomi/Yeelight Lights. There are already a number of other solutions available, but they were not exactly what I wanted, so I made another one to be better than all the others.

<p align="center">
  <!-- Why isn't there Markdown for centered images? -->
  <img src="https://imgs.xkcd.com/comics/standards.png" alt="Competing standards">
</p>

## Installation

```shell
    $ npm install yeelight-platform
```

## Usage : 

### Discover

```js
    const YeeDiscovery = require('yeelight-platform').Discovery
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
```

### Device

```js
    const YeeDevice = require('yeelight-platform').Device

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

```

## Compatible Devices

https://www.yeelight.com/en_US/product/wifi-led-c

https://www.yeelight.com/en_US/product/luna-mc

https://www.yeelight.com/en_US/product/luna

https://www.yeelight.com/en_US/product/mijia-lamp

https://www.yeelight.com/en_US/product/lemon-color

https://www.yeelight.com/en_US/product/lemon-ct

https://www.yeelight.com/en_US/product/pitaya-plus

https://www.yeelight.com/en_US/product/eos

https://www.yeelight.com/en_US/product/cherry1s

https://www.mi.com/us/yeelight-led-light-bulb/

https://www.mi.com/us/mi-bedside-lamp/


## Lint

```shell
    $ npm run lint
```

## API : 

Yeelight Official API Documentation

https://www.yeelight.com/download/Yeelight_Inter-Operation_Spec.pdf

### Author

Sahil Chaddha

mail@sahilchaddha.com
