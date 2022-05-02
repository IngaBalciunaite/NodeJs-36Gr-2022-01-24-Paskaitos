console.log('Labas Pasauli')

//Klasikinis funkcijų žymėjimas
// function test() {
//     console.log('Funkcija paleista')
// }

//ES6 Funkcijų žymėjimas
// const test = () => {
//     console.log('Funkcija paleista')
// }

// test()

const daugybosLentele = (skaicius) => {
    for(let i = 1; i <= 10; i++) {
        console.log(skaicius * i)
    }
}

daugybosLentele(5)

const object = {
    pirmas: "Pirma reiksme"
}