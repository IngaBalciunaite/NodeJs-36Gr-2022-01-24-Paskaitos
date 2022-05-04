import {objektas} from './controller.js'

const x = 10
const y = 15
const z = 25
const e = 10

export const hello = (parametras) => {
    return  `Perduodamas parametras yra ${parametras} vardas iš objekto yra: ${objektas.firstName}`
}

export {x, y, z}

export default z
