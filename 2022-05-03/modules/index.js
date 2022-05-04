//const os = require('os'); CommonJs importavimo budas
//import os from 'os' ES6 Moduliu importavimas

// import * as reiksmes from './utils/helper.js'

// console.log(reiksmes)
// console.log(reiksmes.x)
// console.log(reiksmes.y)
// console.log(reiksmes.z)

import {hello} from './utils/helper.js'
import {objektas as kintamasis} from './utils/controller.js'

console.log(hello('Žalia'))
// console.log(kintamasis)
// console.log(kintamasis.firstName)

const objektas = 'Test'