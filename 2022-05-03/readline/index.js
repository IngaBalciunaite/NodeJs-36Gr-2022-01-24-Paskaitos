import readline from 'readline'

//Readline interfeiso sukurimas ir konfiguracija
const reading = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Readline priijungimas vardo atvaizdavimui

// reading.question('Įveskite savo vardą: ', (vardas) => {
//     console.log('Jūsų vardas yra: ' + vardas)
//     reading.close()
// })

//Daugybos lentele

// reading.question('Įveskite skaičių nuo vieno iki 10: ', digit => {
//     if(digit > 0 && digit <= 10) {

//         for(let i = 1; i <= 10; i++) {
//             console.log(`${digit} x ${i} = ${digit * i}`)
//         }
        
//     } else {
//         console.log('Įvestas neteisingas skaičius')
//     }
//     reading.close()
// })

// reading.question('Įveskite savo vardą: ', vardas => {

//     reading.question('Įveskite savo parvardę: ', pavarde => {
//         console.log(`Sveiki, ${vardas} ${pavarde}`)
//         reading.close()
//     })

// })

reading.question('Įveskite nuo kiek kilogramų pradėsime konvertavimą: ', nuo => {

    reading.question('Įveskite skaičių kiek rezultatų turėtų būti lentelėje: ', iki => {

        const stone = 2.20462
        const pound = 0.157473

        console.log('kg.    pound   stone')
        
        for(let i = nuo; i <= iki; i++) {
            let p = (i * pound).toFixed(2)
            let s = (i * stone).toFixed(2)

            console.log(`${i}   ${p}    ${s}`)
        }

        reading.close()
    })

})